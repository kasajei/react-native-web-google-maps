import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import Polyline from './Polyline';
import Heatmap from './Heatmap';
import Callout from './Callout';
import Omnibox from './Omnibox';

class MapView extends Component {
  state = {
    map: null,
    maps: null,
  };

  getCamera() {
    if (!this.state.map) return;
    return {
      center: {
        lat: this.state.map.center.lat(),
        lng: this.state.map.center.lng(),
      },
      zoom: this.state.map.zoom,
    };
  }

  animateCamera({ center, zoom }) {
    if (!this.state.map) return;
    this.state.map.setCenter(center);
    this.state.map.setZoom(zoom);
  }

  animateToRegion({ latitude, longitude }) {
    if (!this.state.map) return;
    this.state.map.setCenter({
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
    const zoom = (this.props.camera && this.props.camera.zoom) || this.props.defaultZoom || 15;

    const childrenWithProps = React.Children.map(this.props.children, child => {
      if (child.type === Heatmap) {
        return React.cloneElement(child, {
          map: this.state.map,
          maps: this.state.maps,
        });
      }

      const { latitude, longitude } = child.props.coordinate;
      return React.cloneElement(child, {
        lat: latitude,
        lng: longitude,
      });
    });

    return (
      <View style={this.props.style || styles.container}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyC5HxR2IAiiLhXIuCQxctsKq7AVp1CaGmI',
            libraries: 'places,visualization',
          }}
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
            this.setState({ map, maps });
          }}
          yesIWantToUseGoogleMapApiInternals>
          {childrenWithProps}
        </GoogleMapReact>
        {this.props.options && this.props.options.omniboxControl && (
          <Omnibox
            options={this.props.options.omniboxControlOptions}
            map={this.state.map}
            maps={this.state.maps}
          />
        )}
      </View>
    );
  }
}

MapView.Marker = Marker;
MapView.Polyline = Polyline;
MapView.Heatmap = Heatmap;
MapView.Callout = Callout;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default MapView;
