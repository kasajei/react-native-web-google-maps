import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView from 'react-native-maps';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

class InfoBox extends React.Component {
  render() {
    const styles = StyleSheet.create({
      container: {
        marginVertical: 'auto',
        marginHorizontal: 'auto',
        padding: 24,
        backgroundColor: '#81d4fa',
      },
      triangle: {
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: [{ translateX: '-50%' }],
        width: 0,
        height: 0,
        borderColor: 'transparent',
        borderWidth: '10px',
        borderStyle: 'solid',
        borderTopColor: '#81d4fa',
      },
    });

    return (
      <View style={styles.container}>
        <View style={styles.triangle} />
        <Text>{this.props.text}</Text>
      </View>
    );
  }
}

storiesOf('MapView', module)
  .add('basic', () => (
    <View style={styles.container}>
      <MapView defaultZoom={15} region={{ latitude: 48.86, longitude: 2.34 }} />
      <MapView defaultZoom={10} region={{ latitude: 48.86, longitude: 2.34 }} />
    </View>
  ))
  .add('onRegionChangeComplete', () => (
    <View style={styles.container}>
      <MapView
        initialRegion={{ latitude: 48.86, longitude: 2.34 }}
        onRegionChangeComplete={action('onRegionChangeComplete toggled')}
      />
    </View>
  ))
  .add('onPress', () => (
    <View style={styles.container}>
      <MapView region={{ latitude: 48.86, longitude: 2.34 }} onPress={action('onPress toggled')} />
    </View>
  ))
  .add('options', () => (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 48.86,
          longitude: 2.34,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        options={{
          zoomControlOptions: {
            position: 8, //window.google.maps.ControlPosition.RIGHT_CENTER,
          },
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          omniboxControl: true,
          omniboxControlOptions: {
            types: ['(cities)'],
            componentRestrictions: {
              country: ['jp'],
            },
          },
        }}
      />
    </View>
  ));

storiesOf('Marker', module)
  .add('basic', () => (
    <View style={styles.container}>
      <MapView ref={map => (this.map = map)} region={{ latitude: 48.88, longitude: 2.32 }}>
        <MapView.Marker
          title="BAM"
          description="Shape the future of mobile with us"
          coordinate={{ latitude: 48.8828463, longitude: 2.3229091 }}
          onPress={() => {
            this.map.animateToRegion({
              latitude: 48.8828463,
              longitude: 2.3229091,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            });
          }}
        />
        <MapView.Marker
          title="BAM"
          description="Shape the future of mobile with us"
          coordinate={{ latitude: 48.8828463, longitude: 2.3 }}
          onPress={() => {
            console.log(this.map.getCamera());
            const zoom = this.map.getCamera().zoom === 20 ? 15 : 20;
            this.map.animateCamera({
              zoom,
              center: {
                lat: 48.8828463,
                lng: 2.3,
              },
            });
          }}>
          <Text>Paris</Text>
        </MapView.Marker>
      </MapView>
    </View>
  ))
  .add('Callout', () => (
    <View style={styles.container}>
      <MapView ref={map => (this.map = map)} region={{ latitude: 48.88, longitude: 2.32 }}>
        <MapView.Marker
          title="BAM"
          ref={marker => (this.marker = marker)}
          description="Shape the future of mobile with us"
          coordinate={{ latitude: 48.8828463, longitude: 2.3229091 }}
          onPress={() => {
            this.marker.showCallout();
          }}>
          <InfoBox text={'Click me'} />
          <MapView.Callout onPress={action('onPress callout')}>
            <View style={{ padding: 10 }}>
              <Text
                onPress={() => {
                  this.marker.hideCallout();
                }}>
                Callout
              </Text>
            </View>
          </MapView.Callout>
        </MapView.Marker>
      </MapView>
    </View>
  ));

storiesOf('Overlay', module).add('basic', () => (
  <View style={styles.container}>
    <MapView
      ref={map => (this.map = map)}
      region={{ latitude: 40.74, longitude: -74.18 }}
      defaultZoom={13}>
      <MapView.Overlay
        image={{ uri: 'https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg' }}
        bounds={[[40.773941, -74.22655], [40.712216, -74.12544]]}
      />
    </MapView>
  </View>
));

const styles = StyleSheet.create({
  container: {
    height: '100vh',
  },
});
