import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Callout from './Callout';

const styles = StyleSheet.create({
  defaultMarker: {
    width: '27px',
    height: '43px',
    transform: [{ translateX: '-50%' }, { translateY: '-100%' }],
  },
  defaultMarkerImage: {
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
  },
});

class DefaultMarker extends Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this.props.onPress}
        onMouseEnter={this.props.onMouseEnter}
        style={[styles.defaultMarker, this.props.style]}>
        <Image
          style={[styles.defaultMarkerImage, { opacity: this.props.opacity }]}
          title={
            this.props.description
              ? `${this.props.title}\n${this.props.description}`
              : this.props.title
          }
          source={
            this.props.icon || {
              uri: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png',
            }
          }
        />
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

class MapMarker extends Component {
  state = {
    isOpen: false,
  };

  showCallout() {
    this.setState({ isOpen: true });
  }

  hideCallout() {
    this.setState({ isOpen: false });
  }

  render() {
    const calloutChildren = [];
    const markerChildren = [];

    React.Children.forEach(this.props.children, (child, index) => {
      if (child.type !== Callout) {
        markerChildren.push(child);
      } else {
        calloutChildren.push(
          React.cloneElement(child, {
            hideCallout: this.hideCallout.bind(this),
            isOpen: this.state.isOpen,
            key: child.props.key || index,
          })
        );
      }
    });

    return markerChildren.length === 0 ? (
      <DefaultMarker
        style={this.props.style}
        onPress={this.props.onPress}
        title={this.props.title}
        description={this.props.description}
        icon={this.props.icon}
        onMouseEnter={this.props.onMouseOver}
        opacity={this.props.opacity}>
        {calloutChildren}
      </DefaultMarker>
    ) : (
      <View>
        <TouchableOpacity
          style={[this.props.style, { opacity: this.props.opacity }]}
          activeOpacity={1}
          onPress={this.props.onPress}
          onMouseEnter={this.props.onMouseOver}
          opacity={this.props.opacity}>
          {markerChildren}
        </TouchableOpacity>
        {calloutChildren}
      </View>
    );
  }
}

export default MapMarker;
