import React from 'react';
import {Group, Layer, Path, Stage, Text} from 'react-konva';
import {withStyles} from '@material-ui/core';
import {compose} from 'recompose';
import {inject, observer} from 'mobx-react';
import Paper from "@material-ui/core/Paper/Paper";
import mapRouteParamToProps from "../../../hoc/mapRouteParamToProps";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import SaveIcon from '@material-ui/icons/SaveOutlined';
import FurnitureContextMenu from "./FurnitureContextMenu";
import SnackbarContent from "@material-ui/core/es/SnackbarContent/SnackbarContent";

const styles = theme => ({
  snackbar: {
    opacity: 0.7
  },
  warning: {
    opacity: 0.7,
    backgroundColor: "red"
  }
});

class EditRoomPanel extends React.Component {
  konva = React.createRef();
  roomElement = React.createRef();

  updateDimensions = () => {
    const {roomStore} = this.props;
    const {currentRoom} = roomStore;
    const clientHeight = document.body.clientHeight - 200;
    const {clientWidth} = this.roomElement.current;
    currentRoom.setDimensions(clientWidth, clientHeight);
  };

  haveIntersection = (r1, r2) => {
    return !(
      r2.x > r1.x + r1.width ||
      r2.x + r2.width < r1.x ||
      r2.y > r1.y + r1.height ||
      r2.y + r2.height < r1.y
    );
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
    const {currentRoom, furnitureContextMenuModel} = roomStore;

    if (!currentRoom) {
      return <div ref={this.roomElement}/>;
    }

    return (
      <div ref={this.roomElement}>
        <Paper
          style={{
            height: currentRoom.clientHeight,
            width: currentRoom.clientWidth,
            marginLeft: currentRoom.marginLeft
          }}
          onDragOver={e => e.preventDefault()}
          onDrop={e => {
            e.preventDefault();
            const {layerX: x, layerY: y} = e.nativeEvent;
            const kind = e.dataTransfer.getData("kind");
            const offsetY = e.dataTransfer.getData("offsetY");
            const offsetX = e.dataTransfer.getData("offsetX");
            const mu = currentRoom.meterUnit.get();
            currentRoom.addFurniture(kind, (x - offsetX) / mu, (y - offsetY) / mu);
          }}>
          <Stage ref={this.konva}
                 width={currentRoom.clientWidth}
                 height={currentRoom.clientHeight}>
            <Layer onDragEnd={e => {
              const {currentTarget: layer} = e;
              const ch1 = [...layer.children];
              const ch2 = [...layer.children];
              currentRoom.hasCollision = !!ch1.find(g => {
                  return ch2
                    .filter(gg => gg !== g)
                    .find(gg => {
                      return this.haveIntersection(g.getClientRect(), gg.getClientRect())
                    });
                });
            }}>{currentRoom.furniture.map((f, key) => (
              <Group key={key}
                     draggable
                     scaleX={f.scale}
                     scaleY={f.scale}
                     offsetX={f.offsetX}
                     offsetY={f.offsetY}
                     x={f.x}
                     y={f.y}
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
                     }}
                     onContextMenu={furnitureContextMenuModel.open(f)}>
                <Path
                  x={f.x}
                  y={f.y}
                  data={f.pathData}
                  fill='yellow'
                />
                <Text x={f.x}
                      y={f.y}
                      width={40}
                      height={45}
                      verticalAlign="middle"
                      align="center"
                      fill="grey"
                      fontSize={20}
                      text={f.number}
                />
                {f.chairs.map(c =>
                  <Path key={c.key} x={c.x} y={c.y} data={c.data} fill='brown'/>
                )}
              </Group>
            ))}</Layer>
          </Stage>
        </Paper>
        <FurnitureContextMenu/>
        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}

          open={currentRoom.hasCollision || currentRoom.isValidNumbers}>
          <SnackbarContent
            className={classes.warning}
            message="Arrange the furniture without collisions and assign a unique number for each"
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
          open={true}
          message={currentRoom.name}
          className={classes.snackbar}
          action={[
            <IconButton key='save' color="inherit" disabled={currentRoom.hasCollision} onClick={() => {
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