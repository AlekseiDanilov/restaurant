import React from 'react';
import {inject, observer} from 'mobx-react';
import {compose} from 'recompose';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import tileData from './tileData';
import mapRouteParamToProps from "../../../hoc/mapRouteParamToProps";
import Paper from "@material-ui/core/Paper/Paper";
import {DragDropContainer} from 'react-drag-drop-container';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gridList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tile: {
    cursor: 'grab',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    height: '80px'
  }
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
        <GridList className={classes.gridList} cols={4}>
          {tileData.map(tile => (
            <GridListTile key={tile.img} className={classes.tile} style={{
              width: tile.width,
              height: tile.height
            }}>
              <DragDropContainer targetKey="furniture"
                                 className={classes.tile}
                                 dragData={{kind: tile.kind}}>
                <img src={tile.img}
                     className={classes.img}
                     alt={tile.title}/>
              </DragDropContainer>
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