import React from 'react';
import {inject, observer} from 'mobx-react';
import {compose} from 'recompose';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddBox';
import tileData from './tileData';
import mapRouteParamToProps from "../../../hoc/mapRouteParamToProps";
import Paper from "@material-ui/core/es/Paper/Paper";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    flexWrap: 'nowrap',
    justifyContent: 'center'
  },

  tile: {
    cursor: 'grab',
  },

  titleBar: {
    height: 25
  },
});


class FurniturePanel extends React.Component {

  render() {
    const {classes, roomStore} = this.props;
    const {currentRoom} = roomStore;
    if (!currentRoom) {
      return null;
    }
    return (
      <Paper className={classes.root}>
        <GridList className={classes.gridList} cols={1}>
          {tileData.map(tile => (
            <GridListTile key={tile.img} style={{width: tile.width, height: tile.height}}>
              <GridListTileBar
                title={tile.title}
                className={classes.titleBar}
                actionIcon={
                  <IconButton color="inherit" onClick={() => {
                    currentRoom.addFurniture(tile.kind);
                  }}>
                    <AddIcon color="inherit"/>
                  </IconButton>
                }
              />
              <img src={tile.img}
                   draggable={true}
                   className={classes.tile}
                   onDragStart={e => {
                     const {offsetX, offsetY} = e.nativeEvent;
                     e.dataTransfer.setData("kind", tile.kind);
                     e.dataTransfer.setData("offsetX", offsetX);
                     e.dataTransfer.setData("offsetY", offsetY);
                   }}
                   alt={tile.title}/>
            </GridListTile>
          ))}
        </GridList>
      </Paper>
    );
  }
}

FurniturePanel.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default compose(
  withStyles(styles),
  mapRouteParamToProps('id', 'currentRoomId'),
  inject('roomStore'),
  observer,
)(FurniturePanel);