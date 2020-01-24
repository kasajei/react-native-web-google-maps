import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import Callout from './Callout';

const styles = StyleSheet.create({
  defaultMarker: {
    width: '27px',
    height: '43px',
    resizeMode: 'stretch',
    transform: [{ translateX: '-50%' }, { translateY: '-100%' }],
  },
  defaultMarkerImage: {
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
        style={[styles.defaultMarker, this.props.style, { opacity: this.props.opacity }]}>
        <Image
          style={styles.defaultMarkerImage}
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
    const hasOnlyCalloutChildren = React.Children.toArray(this.props.children).reduce(
      (acc, child) => {
        if (!acc) return false;
        return child.type === Callout;
      },
      true
    );

    const childrenWithProps = React.Children.map(this.props.children, child => {
      if (child.type !== Callout) return child;
      return React.cloneElement(child, {
        hideCallout: this.hideCallout.bind(this),
        isOpen: this.state.isOpen,
      });
    });

    return hasOnlyCalloutChildren ? (
      <DefaultMarker
        style={this.props.style}
        onPress={this.props.onPress}
        title={this.props.title}
        description={this.props.description}
        icon={this.props.icon}
        onMouseEnter={this.props.onMouseOver}
        opacity={this.props.opacity}>
        {childrenWithProps}
      </DefaultMarker>
    ) : (
      <TouchableOpacity
        style={[this.props.style, { opacity: this.props.opacity }]}
        activeOpacity={1}
        onPress={this.props.onPress}
        onMouseEnter={this.props.onMouseOver}
        opacity={this.props.opacity}>
        {childrenWithProps}
      </TouchableOpacity>
    );
  }
}

export default MapMarker;
