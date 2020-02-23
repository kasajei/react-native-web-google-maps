import React from 'react';

class MapOverlay extends React.Component {
  componentWillUnmount() {
    if (!this.overlay) return;
    this.overlay.setMap(null);
  }

  componentWillUpdate() {
    if (this.overlay || !this.props.map || !this.props.maps) return null;
    const [[north, west], [south, east]] = this.props.bounds;
    this.overlay = new this.props.maps.GroundOverlay(this.props.image.uri, {
      north,
      south,
      east,
      west,
    });
    this.overlay.setMap(this.props.map);
  }

  render() {
    return null;
  }
}

export default MapOverlay;
