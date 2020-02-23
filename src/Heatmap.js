import React from 'react';

class MapHeatmap extends React.Component {
  componentWillUnmount() {
    if (!this.heatmap) return;
    this.heatmap.setMap(null);
  }

  componentWillUpdate() {
    if (this.heatmap || !this.props.map || !this.props.maps) return null;
    this.heatmap = new this.props.maps.visualization.HeatmapLayer({
      opacity: typeof this.props.opacity === 'number' ? this.props.opacity : 0.7,
      radius: typeof this.props.radius === 'number' ? this.props.radius : 20,
      data: this.props.points.map(({ latitude, longitude, weight = 1 }) => ({
        location: new this.props.maps.LatLng(latitude, longitude),
        weight,
      })),
    });
    this.heatmap.setMap(this.props.map);
  }

  render() {
    return null;
  }
}

export default MapHeatmap;
