import React from 'react';
import {Image} from 'react-konva';

export default class ImageEx extends React.Component {
  state = {
    loadedImage: null
  };

  componentDidMount() {
    const {srcPath: src} = this.props;
    const image = new window.Image();
    image.src = src;
    image.onload = () => {
      this.setState({loadedImage: image});
    };
  }

  render() {
    const {image, srcPath, ...props} = this.props;
    const {loadedImage} = this.state;
    return <Image image={loadedImage} {...props}/>;
  }
}