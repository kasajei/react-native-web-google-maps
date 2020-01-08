import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

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
      <TouchableOpacity onPress={this.props.onPress}>
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
      </TouchableOpacity>
    );
  }
}

class MapMarker extends Component {
  render() {
    return <DefaultMarker {...this.props} />;
  }
}

export default MapMarker;
