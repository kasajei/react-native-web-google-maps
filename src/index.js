import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import Polyline from './Polyline';
import Callout from './Callout';

class MapView extends Component {
  render() {
    const region = this.props.region || this.props.initialRegion;
    const center = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: 0.38,
      longitudeDelta: 0.38,
    };

    return (
      <View style={this.props.style || styles.container}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC5HxR2IAiiLhXIuCQxctsKq7AVp1CaGmI' }}
          center={center}
          zoom={15}
          {...this.props}>
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
