import React from 'react';
import {Layer, Stage} from 'react-konva';
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
import {DropTarget} from 'react-drag-drop-container';
import Furniture from "../../../component/furniture/Furniture";

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
          style={{height, width, marginLeft}}>
          <DropTarget targetKey="furniture"
                      onHit={onDropFurniture}>
            <Stage ref={konva}
                   width={width}
                   height={height}>
              <Layer onDragEnd={validateCollision}>
                {currentRoom.furniture.map((f, key) => (
                  <Furniture key={f.id}
                             furniture={f}
                             groupProps={f => ({
                               draggable: true,
                               onDragEnd: setFurniturePosition(f),
                               dragBoundFunc: correctFurniturePosition(f),
                               onDblTap: furnitureContextMenuModel.openByTouch(f, marginLeft, 200),
                               onContextMenu: furnitureContextMenuModel.open(f)
                             })}
                  />
                ))}
              </Layer>
            </Stage>

          </DropTarget>
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
      if (roomStore.currentRoom) {
        roomViewModel.updateDimensions();
        roomViewModel.validateCollision();
        window.addEventListener("resize", () => roomViewModel.updateDimensions());
      }
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