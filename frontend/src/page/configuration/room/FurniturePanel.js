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

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    //flexWrap: 'nowrap'
    justifyContent: 'center'
  },
  title: {
    color: theme.palette.common.white
  },
  icon: {
    color: theme.palette.common.white
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
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={1}>
          {tileData.map(tile => (
            <GridListTile key={tile.img} style={{width: tile.width, height: tile.height}}>
              <img src={tile.img} alt={tile.title}/>
              <GridListTileBar
                title={tile.title}
                className={classes.titleBar}
                actionIcon={
                  <IconButton className={classes.icon} onClick={() => {
                    currentRoom.addFurniture(tile.kind);
                  }}>
                    <AddIcon/>
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
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