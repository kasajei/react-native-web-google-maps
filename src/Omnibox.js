import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  omnibox: {
    position: 'absolute',
    margin: '10px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    shadowColor: 'rgba(0, 0, 0, .2)',
    shadowRadius: '4px',
    shadowOffset: {
      width: '0',
      height: '2px',
    },
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
    if (this.props.options && this.props.options.onPlaceChanged) {
      this.props.options.onPlaceChanged(place);
    }
  }

  render() {
    if (!this.props.map || !this.props.maps) return null;

    return (
      <View style={styles.omnibox}>
        <input
          type="text"
          id="omnibox"
          autoFocus
          style={{
            width: '400px',
            height: '50px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            padding: '0 10px',
          }}
          ref={ref => {
            if (!ref) return;
            this.inputRef = ref;
            this.autocomplete = new this.props.maps.places.Autocomplete(ref, this.props.options);
            this.autocomplete.addListener('place_changed', this.onPlaceChanged);
          }}
        />
        <style> {'#omnibox:focus { outline: none }'} </style>
      </View>
    );
  }
}

export default MapOmnibox;
