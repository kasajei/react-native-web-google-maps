import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

class MapViewCallout extends Component {
  render() {
    const { onPress, isOpen } = this.props;
    if (isOpen) {
      return <TouchableOpacity onPress={onPress}>{this.props.children}</TouchableOpacity>;
    } else {
      return null;
    }
  }
}

export default MapViewCallout;
