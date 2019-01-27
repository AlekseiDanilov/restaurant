import React from 'react';
import {Group, Layer, Path, Stage} from 'react-konva';
import {withStyles} from '@material-ui/core';
import {compose} from 'recompose';
import {inject, observer} from 'mobx-react';
import Paper from "@material-ui/core/Paper/Paper";
import mapRouteParamToProps from "../../../hoc/mapRouteParamToProps";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import SaveIcon from '@material-ui/icons/SaveOutlined';

const styles = theme => ({
  konva: {
    height: '80vh',
  },
});

class EditRoomPanel extends React.Component {
  konva = React.createRef();
  roomElement = React.createRef();

  updateDimensions = () => {
    const {roomStore} = this.props;
    const {currentRoom} = roomStore;
    const clientHeight = document.body.clientHeight - 100;
    const {clientWidth} = this.roomElement.current;
    currentRoom.setDimensions(clientWidth, clientHeight);
  };

  componentDidMount() {
    const {roomStore, currentRoomId} = this.props;
    roomStore.loadCurrentRoom(currentRoomId).then(() => {
      if (roomStore.currentRoom) {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
      }
    });
  }

  componentWillUnmount() {
    const {roomStore} = this.props;
    if (roomStore.currentRoom) {
      window.removeEventListener("resize", this.updateDimensions);
    }
  }

  render() {
    const {classes, roomStore} = this.props;
    const {currentRoom} = roomStore;

    if (!currentRoom) {
      return <div ref={this.roomElement}/>;
    }

    return (
      <div ref={this.roomElement}>
        <Paper style={{
          height: currentRoom.clientHeight,
          width: currentRoom.clientWidth,
          marginLeft: currentRoom.marginLeft
        }}>
          <Stage ref={this.konva}
                 width={currentRoom.clientWidth}
                 height={currentRoom.clientHeight}
                 className={classes.konva}>
            <Layer>{currentRoom.furniture.map((f, key) => (
              <Group key={key}
                     draggable
                     scaleX={f.scale}
                     scaleY={f.scale}
                     offsetX={f.offsetX}
                     offsetY={f.offsetY}
                     x={f.x}
                     y={f.y}
                     onDblClick={() => currentRoom.removeFurniture(f)}
                     onDragEnd={e => {
                       const {x, y} = e.target.getPosition();
                       const newX = Math.max(0, Math.min(x, currentRoom.clientWidth - f.width));
                       const newY = Math.max(0, Math.min(y, currentRoom.clientHeight - f.height));
                       f.setPosition(newX, newY);
                     }}
                     dragBoundFunc={position => {
                       return ({
                         x: Math.max(0, Math.min(position.x, currentRoom.clientWidth - f.width)),
                         y: Math.max(0, Math.min(position.y, currentRoom.clientHeight - f.height))
                       })
                     }}>
                <Path
                  x={f.x}
                  y={f.y}
                  data={f.pathData}
                  fill='yellow'
                />
                {f.chairs.map(c =>
                  <Path key={c.key} x={c.x} y={c.y} data={c.data} fill='brown'/>
                )}
              </Group>
            ))}</Layer>
          </Stage>
        </Paper>
        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
          open={true}
          message={currentRoom.name}
          action={[
            <IconButton color="inherit" onClick={() => {
              roomStore.update(currentRoom)
            }}>
              <SaveIcon/>
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  mapRouteParamToProps('id', 'currentRoomId'),
  inject('roomStore'),
  observer,
)(EditRoomPanel);