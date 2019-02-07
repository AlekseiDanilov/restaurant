import React from 'react';
import {withStyles} from '@material-ui/core';
import {compose} from 'recompose';
import {inject, observer} from 'mobx-react';
import Popover from "@material-ui/core/es/Popover/Popover";
import MenuList from "@material-ui/core/es/MenuList/MenuList";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import ClickAwayListener from "@material-ui/core/es/ClickAwayListener/ClickAwayListener";
import withDialog from "../../../hoc/withDialog";
import ChangeFurnitureNumberDialog from "./ChangeFurnitureNumberDialog";
import Paper from "@material-ui/core/es/Paper/Paper";

const styles = theme => ({
  menuItem: {
    height: 10
  }
});

const preventDefault = e => e.preventDefault();

class FurnitureContextMenu extends React.Component {
  render() {
    const {classes, roomStore, openDialog} = this.props;
    const {furnitureContextMenuModel} = roomStore;
    const {
      isOpen, top, left, close, deleteFurniture
    } = furnitureContextMenuModel;

    return (
      <Popover
        open={isOpen}
        anchorReference="anchorPosition"
        anchorPosition={{top, left}}
      >
        <ClickAwayListener onClickAway={close}
                           mouseEvent="onMouseDown"
                           onContextMenu={preventDefault}>
          <Paper>
          <MenuList>
            <MenuItem className={classes.menuItem}
                      onClick={deleteFurniture}>
              Delete
            </MenuItem>
            <MenuItem className={classes.menuItem}
                      onClick={openDialog}>
              Change number
            </MenuItem>
          </MenuList>
          </Paper>
        </ClickAwayListener>
      </Popover>
    );
  }
}

export default compose(
  withDialog(ChangeFurnitureNumberDialog),
  withStyles(styles),
  inject('roomStore'),
  observer,
)(FurnitureContextMenu);