import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import Polyline from './Polyline';
import Callout from './Callout';

class MapView extends Component {
  getCamera() {
    return {
      center: {
        lat: this.map.center.lat(),
        lng: this.map.center.lng(),
      },
      zoom: this.map.zoom,
    };
  }

  animateCamera({ center, zoom }) {
    if (!this.map) return;
    this.map.setCenter(center);
    this.map.setZoom(zoom);
  }

  animateToRegion({ latitude, longitude }) {
    if (!this.map) return;
    this.map.setCenter({
      lat: latitude,
      lng: longitude,
    });
  }

  render() {
    const region =
      (this.props.camera && this.props.camera.center) ||
      this.props.region ||
      this.props.initialRegion;
    const center = {
      lat: region.latitude,
      lng: region.longitude,
    };
    const zoom = (this.props.camera && this.props.camera.zoom) || 15;

    const childrenWithProps = React.Children.map(this.props.children, child => {
      const { latitude, longitude } = child.props.coordinate;
      return React.cloneElement(child, {
        lat: latitude,
        lng: longitude,
      });
    });

    return (
      <View style={this.props.style || styles.container}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC5HxR2IAiiLhXIuCQxctsKq7AVp1CaGmI' }}
          center={center}
          zoom={zoom}
          onClick={({ lat, lng, x, y }) => {
            if (typeof this.props.onPress !== 'function') return;
            this.props.onPress({
              coordinate: { latitude: lat, longitude: lng },
              point: { x, y },
            });
          }}
          onDrag={({ center }) => {
            if (typeof this.props.onRegionChange !== 'function') return;
            this.props.onRegionChange({ latitude: center.lat(), longitude: center.lng() });
          }}
          onDragEnd={({ center }) => {
            if (typeof this.props.onRegionChangeComplete !== 'function') return;
            this.props.onRegionChangeComplete({ latitude: center.lat(), longitude: center.lng() });
          }}
          options={this.props.options}
          onGoogleApiLoaded={({ map, maps }) => {
            this.map = map;
          }}
          yesIWantToUseGoogleMapApiInternals>
          {childrenWithProps}
        </GoogleMapReact>
      </View>
    );
  }
}

MapView.Marker = Marker;
MapView.Polyline = Polyline;
MapView.Callout = Callout;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default MapView;
