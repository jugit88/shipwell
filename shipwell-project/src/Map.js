import React, { Component } from 'react';
import Marker from './Marker'
const google = window.google;
class GoogleMap extends Component {
  // shouldComponentUpdate() {
  //   return false;
  // }
  componentDidMount() {
   this.map = new google.maps.Map(this.mapInstance,{
      center: {lat: this.props.lat, lng: this.props.lng},
      zoom: 5
    });
  }
  
  render() {
    return (
      <div id="map-container">
        <div ref={(map => {this.mapInstance = map})} style={{height: '500px', width: '500px'}}/>
        <Marker map={this.map} google={google} location={this.props.startPosition} />
        <Marker map={this.map} google={google} location={this.props.endPosition} />
      </div>
    );
  }
}

export default GoogleMap;