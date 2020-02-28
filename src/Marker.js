import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Callout from './Callout';

class DefaultMarker extends React.Component {
  marker = null;
  listeners = [];

  shouldComponentUpdate(nextProps) {
    return (
      (!this.props.map && nextProps.map) ||
      (!this.props.maps && nextProps.maps) ||
      this.props.onPress !== nextProps.onPress ||
      this.props.onMouseEnter !== nextProps.onMouseEnter ||
      this.props.icon !== nextProps.icon ||
      this.props.title !== nextProps.title ||
      this.props.description !== nextProps.description ||
      this.props.lat !== nextProps.lat ||
      this.props.lng !== nextProps.lng ||
      this.props.opacity !== nextProps.opacity
    );
  }

  componentDidUpdate() {
    if (this.marker) {
      this.marker.setOptions({
        position: { lat: this.props.lat, lng: this.props.lng },
        icon: this.props.icon && this.props.icon.url,
        opacity: this.props.opacity || 1,
        title: this.props.description
          ? `${this.props.title}\n${this.props.description}`
          : this.props.title,
        map: this.props.map,
      });
      return;
    }

    if (!this.props.map || !this.props.maps) return;
    this.marker = new this.props.maps.Marker({
      position: { lat: this.props.lat, lng: this.props.lng },
      icon: this.props.icon && this.props.icon.url,
      opacity: this.props.opacity || 1,
      title: this.props.description
        ? `${this.props.title}\n${this.props.description}`
        : this.props.title,
      map: this.props.map,
    });
    if (this.props.onPress) {
      this.listeners.push(this.marker.addListener('click', this.props.onPress));
    }
    if (this.props.onMouseEnter) {
      this.listeners.push(this.marker.addListener('mouseover', this.props.onMouseEnter));
    }
  }

  componentWillUnmount() {
    if (!this.marker) return;
    this.marker.setMap(null);
    this.listeners.forEach(listener => this.props.maps.event.removeListener(listener));
  }

  render() {
    return this.props.children;
  }
}

class MapMarker extends React.PureComponent {
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

    React.Children.forEach(this.props.children, child => {
      if (child.type !== Callout) {
        markerChildren.push(child);
      } else {
        calloutChildren.push(
          React.cloneElement(child, {
            hideCallout: this.hideCallout.bind(this),
            isOpen: this.state.isOpen,
          })
        );
      }
    });

    return markerChildren.length === 0 ? (
      <DefaultMarker
        onPress={this.props.onPress}
        title={this.props.title}
        description={this.props.description}
        icon={this.props.icon}
        onMouseEnter={this.props.onMouseOver}
        opacity={this.props.opacity}
        lat={this.props.lat}
        lng={this.props.lng}
        map={this.props.map}
        maps={this.props.maps}>
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
