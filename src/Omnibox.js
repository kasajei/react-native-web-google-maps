import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  omnibox: {
    position: 'absolute',
    margin: '10px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '4px',
    shadowColor: 'rgba(0, 0, 0, .2)',
    shadowRadius: '4px',
    shadowOffset: {
      width: '0',
      height: '2px',
    },
    flexDirection: 'row',
  },
  textInput: {
    width: '350px',
    height: '50px',
    borderWidth: 0,
    borderRadius: '4px',
    fontSize: '1rem',
    outline: 'none',
    paddingLeft: 10,
    paddingRight: 44,
  },
  searchButton: {
    position: 'absolute',
    right: 10,
    width: 24,
    height: 24,
    overflow: 'hidden',
  },
  searchIcon: {
    width: 72,
    height: 24,
  },
});

class MapOmnibox extends Component {
  constructor(props) {
    super(props);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
  }

  // eslint-disable-next-line bam/no-react-unbound
  onPlaceChanged() {
    const place = this.autocomplete.getPlace();

    if (!place || !place.geometry) {
      this.placesService.findPlaceFromQuery(
        {
          query: this.inputRef.value,
          fields: ['ALL'],
        },
        this.props.options && this.props.options.onPlaceChanged
          ? result => {
              this.props.options.onPlaceChanged(result[0]);
            }
          : result => {
              const { lat, lng } = result[0].geometry.location;
              this.props.map.setCenter({
                lat: lat(),
                lng: lng(),
              });
            }
      );
      return;
    }

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

    const customStyles = (this.props.options && this.props.options.styles) || {};

    return (
      <View style={[styles.omnibox, customStyles.omnibox]}>
        <TextInput
          autoFocus
          style={[styles.textInput, customStyles.textInput]}
          ref={ref => {
            if (!ref) return;
            this.inputRef = ref._node;
            this.placesService = new this.props.maps.places.PlacesService(this.props.map);
            this.autocomplete = new this.props.maps.places.Autocomplete(
              ref._node,
              this.props.options
            );
            this.autocomplete.addListener('place_changed', this.onPlaceChanged);
          }}
        />
        <TouchableOpacity
          style={[styles.searchButton, customStyles.searchButton]}
          onPress={this.onPlaceChanged}>
          <Image
            style={[styles.searchIcon, customStyles.searchIcon]}
            source={{
              uri: 'https://maps.gstatic.com/tactile/omnibox/quantum_search_button-20150825-2x.png',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default MapOmnibox;
