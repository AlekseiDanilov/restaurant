import React from 'react';

import { Stage, Layer, Rect, Circle, Text, Line } from 'react-konva';
import { withStyles } from '@material-ui/core';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';

const styles = theme => ({
  konva: {
    height: '80vh',
    background: '#80808030',
  },
});

class EditRoomPanel extends React.Component {
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
    return (
      <Stage ref={this.konva}
             width={clientWidth}
             height={clientHeight}
             className={classes.konva}>
        <Layer>
          <Text text="Big rect" x={50} y={15} fontSize={15}/>
          <Text text="Small rect" x={150} y={15} fontSize={15}/>
          <Text text="Big circle" x={245} y={15} fontSize={15}/>
          <Text text="Small circle" x={320} y={15} fontSize={15}/>
          <Line
            x={10}
            y={130}
            points={[0, 3, 400, 3]}
            stroke="black"
            strokeWidth={2}
          />
          {rectFurniture.map((r, idx) => {
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
                if (r.color === 'brown') {
                  r.color = 'green';
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
                if (c.color === 'brown') {
                  c.color = 'green';
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
)(EditRoomPanel);