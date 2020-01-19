import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

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
  input: {
    width: '400px',
    height: '50px',
    borderWidth: 0,
    borderRadius: '4px',
    fontSize: '1rem',
    paddingHorizontal: '10px',
  },
});

class MapOmnibox extends Component {
  constructor(props) {
    super(props);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
  }

  onPlaceChanged() {
    const place = this.autocomplete.getPlace();

    if (this.props.options && this.props.options.onPlaceChanged) {
      this.props.options.onPlaceChanged(place);
      return;
    }

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
        <TextInput
          type="text"
          id="omnibox"
          autoFocus
          style={styles.input}
          ref={ref => {
            if (!ref) return;
            this.autocomplete = new this.props.maps.places.Autocomplete(
              ref._node,
              this.props.options
            );
            this.autocomplete.addListener('place_changed', this.onPlaceChanged);
          }}
        />
        <style> {'#omnibox:focus { outline: none }'} </style>
      </View>
    );
  }
}

export default MapOmnibox;
