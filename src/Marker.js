import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import Callout from './Callout';

const styles = StyleSheet.create({
  defaultMarker: {
    width: '27px',
    height: '43px',
    resizeMode: 'stretch',
  },
});

class DefaultMarker extends Component {
  render() {
    return (
      <TouchableOpacity activeOpacity={1} onPress={this.props.onPress}>
        <Image
          style={styles.defaultMarker}
          title={
            this.props.description
              ? `${this.props.title}\n${this.props.description}`
              : this.props.title
          }
          source={{
            uri: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png',
          }}
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
    let hasOnlyCalloutChildren = true;

    React.Children.forEach(this.props.children, child => {
      if (!hasOnlyCalloutChildren) return;
      if (child.type !== Callout) hasOnlyCalloutChildren = false;
    });

    const childrenWithProps = React.Children.map(this.props.children, child => {
      if (child.type !== Callout) return child;
      return React.cloneElement(child, {
        hideCallout: this.hideCallout.bind(this),
        isOpen: this.state.isOpen,
      });
    });

    return hasOnlyCalloutChildren ? (
      <DefaultMarker
        onPress={this.props.onPress}
        title={this.props.title}
        description={this.props.description}>
        {childrenWithProps}
      </DefaultMarker>
    ) : (
      <TouchableOpacity activeOpacity={1} onPress={this.props.onPress}>
        {childrenWithProps}
      </TouchableOpacity>
    );
  }
}

export default MapMarker;
