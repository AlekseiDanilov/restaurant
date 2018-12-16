import React from 'react';

import { Stage, Layer, Rect, Circle } from 'react-konva';
import { withStyles } from '@material-ui/core';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';

const styles = theme => ({
  konva: {
    height: '80vh',
    background: '#80808030',
  },
});

class RoomsPanel extends React.Component {
  konva = React.createRef();
  state = {
    clientHeight: 0,
    clientWidth: 0,
  };

  componentDidMount() {
    const {
      clientHeight,
      clientWidth,
    } = this.konva.current.getAttrs().container;

    this.setState({ clientHeight, clientWidth });
  }

  render() {
    const { clientHeight, clientWidth } = this.state;
    const { classes, roomStore } = this.props;
    const { rectFurniture, circleFurniture } = roomStore;
    console.log(rectFurniture);
    return (
      <Stage ref={this.konva}
             width={clientWidth}
             height={clientHeight}
             className={classes.konva}>
        <Layer>{rectFurniture.map((r, idx) => {
          return <Rect
            key={idx}
            x={r.x}
            y={r.y}
            width={r.width}
            height={r.height}
            fill={r.color}
            draggable
            //shadowBlur={3}
            onDragStart={() => {
              if(r.color === "brown") {
                r.color = "green";
                roomStore.createDefaultRectFurniture();
              }
            }}
          />;
        })}
          {circleFurniture.map((c, idx) => {
            return <Circle
              key={idx}
              x={c.x}
              y={c.y}
              width={c.width}
              height={c.height}
              fill={c.color}
              draggable
              //shadowBlur={3}
              onDragStart={() => {
                if(c.color === "brown") {
                  c.color = "green";
                  roomStore.createDefaultCircleFurniture();
                }
              }}
            />;
          })}
        </Layer>
      </Stage>
    );
  }
}

export default compose(
  withStyles(styles),
  inject('roomStore'),
  observer,
)(RoomsPanel);