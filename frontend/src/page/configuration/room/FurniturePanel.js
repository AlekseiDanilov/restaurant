import React from 'react';
import {inject, observer} from 'mobx-react';
import {compose} from 'recompose';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import tileData from './tileData';
import mapRouteParamToProps from "../../../hoc/mapRouteParamToProps";
import Paper from "@material-ui/core/Paper/Paper";
import {DragDropContainer} from 'react-drag-drop-container';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
   height: '10vh',
    margin: '3px',
    cursor: 'grab'
  }
});


class FurniturePanel extends React.Component {

  render() {
    const {classes, roomStore} = this.props;
    const {currentRoom, roomViewModel} = roomStore;
    if (!currentRoom) {
      return null;
    }
    return (
      <div ref={roomViewModel.furniturePanel}>
        <Paper className={classes.root}>
          {tileData.map(tile => (
            <DragDropContainer key={tile.kind}
                               targetKey="furniture"
                               dragData={{kind: tile.kind}}>
              <img src={tile.img}
                   className={classes.img}
                   alt={tile.title}/>
            </DragDropContainer>
          ))}
        </Paper>
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