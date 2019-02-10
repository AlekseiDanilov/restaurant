import React from 'react';
import {Group, Text} from 'react-konva';
import {observer} from 'mobx-react';
import {compose} from 'recompose';
import ImageEx from "../konva/ImageEx";


class Furniture extends React.Component {
  render() {
    const {groupProps, furniture: f} = this.props;

    return (
      <Group x={f.x}
             y={f.y}
             {...(groupProps(f))}
      >
        <ImageEx srcPath={f.srcPath}
                 width={f.width}
                 height={f.height}
                 stroke='grey'
                 strokeWidth={0.4}/>
        <Text width={f.width}
              height={f.height}
              verticalAlign="middle"
              align="center"
              fill="grey"
              fontStyle="bold"
              fontSize={0.4 * f.meterUnit.get()}
              text={f.number}/>
      </Group>
    );
  }
}

export default compose(
  observer,
)(Furniture);