import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  omnibox: {
    position: 'absolute',
    margin: '10px',
    width: '400px',
  },
});

class MapOmnibox extends Component {
  constructor(props) {
    super(props);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
  }

  onPlaceChanged() {
    const place = this.autocomplete.getPlace();
    const { lat, lng } = place.geometry.location;
    this.props.map.setCenter({
      lat: lat(),
      lng: lng(),
    });
  }

  render() {
    if (!this.props.map || !this.props.maps) return null;

    return (
      <View style={styles.omnibox}>
        <input
          type="text"
          autoFocus
          ref={ref => {
            this.inputRef = ref;
            this.autocomplete = new this.props.maps.places.Autocomplete(ref, this.props.options);
            this.autocomplete.addListener('place_changed', this.onPlaceChanged);
          }}
        />
      </View>
    );
  }
}

export default MapOmnibox;
