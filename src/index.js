import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import Polyline from './Polyline';
import Callout from './Callout';

class MapView extends Component {
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

    return (
      <View style={this.props.style || styles.container}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC5HxR2IAiiLhXIuCQxctsKq7AVp1CaGmI' }}
          center={center}
          zoom={zoom}
          onDrag={({ center }) => {
            if (typeof this.props.onRegionChange !== 'function') return;
            this.props.onRegionChange({ latitude: center.lat(), longitude: center.lng() });
          }}
          onDragEnd={({ center }) => {
            if (typeof this.props.onRegionChangeComplete !== 'function') return;
            this.props.onRegionChangeComplete({ latitude: center.lat(), longitude: center.lng() });
          }}>
          {this.props.children}
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
