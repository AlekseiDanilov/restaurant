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
  render() {
    const {classes, roomStore} = this.props;
    const {currentRoom, roomViewModel, furnitureContextMenuModel} = roomStore;
    const {
      clientHeight: height,
      clientWidth: width,
      marginLeft,
      onDropFurniture,
      konva,
      roomElement,
      validateCollision,
      correctFurniturePosition,
      setFurniturePosition
    } = roomViewModel;

    if (!currentRoom) {
      return <div ref={roomViewModel.roomElement}/>;
    }

    return (
      <div ref={roomElement}>
        <Paper
          style={{height, width, marginLeft}}
          onDragOver={e => e.preventDefault()}
          onDrop={onDropFurniture}>
          <Stage ref={konva}
                 width={width}
                 height={height}>
            <Layer onDragEnd={validateCollision}>{currentRoom.furniture.map((f, key) => (
              <Group key={key}
                     draggable
                     scaleX={f.scale}
                     scaleY={f.scale}
                     offsetX={f.offsetX}
                     offsetY={f.offsetY}
                     x={f.x}
                     y={f.y}
                     onDragEnd={setFurniturePosition(f)}
                     dragBoundFunc={correctFurniturePosition(f)}
                     onDblTap={furnitureContextMenuModel.openByTouch(f, marginLeft, 200)}
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
          open={roomViewModel.hasCollision || currentRoom.isErrorNumbers}>
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
            <IconButton key='save'
                        color="inherit"
                        onClick={() => {
                          roomStore.update(currentRoom)
                        }}>
              <SaveIcon/>
            </IconButton>
          ]}
        />
      </div>
    );
  }

  componentDidMount() {
    const {roomStore, currentRoomId} = this.props;
    const {roomViewModel} = roomStore;
    roomStore.loadCurrentRoom(currentRoomId).then(() => {
      roomViewModel.updateDimensions();
      roomViewModel.validateCollision();
      window.addEventListener("resize", () => roomViewModel.updateDimensions());
    });
  }

  componentWillUnmount() {
    const {roomStore} = this.props;
    if (roomStore.currentRoom) {
      window.removeEventListener("resize", this.updateDimensions);
    }
  }
}

export default compose(
  withStyles(styles),
  mapRouteParamToProps('id', 'currentRoomId'),
  inject('roomStore'),
  observer,
)(EditRoomPanel);