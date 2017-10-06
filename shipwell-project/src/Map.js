import React, { Component } from 'react';
// import Marker from './Marker'
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
  // create markers and route before mounted component's props change
  componentWillReceiveProps(nextProps) {
    
    let start = this.createMarker(this.props.startPosition, nextProps.startPosition);
    let end = this.createMarker(this.props.endPosition, nextProps.endPosition);
  }
  createMarker(location, newLocation) {
    let marker = new google.maps.Marker({
      map: this.map
    });
    // the the location doesn't match newLocation, that means we need update location
    if (location.lat !== newLocation.lat || location.lng !== newLocation.lng) {
      if (this.props.markers.length === 2) {
      this.props.markers.forEach((m) => {
        m.setMap(null);
      });
      // this.props.replaceMarker(marker);
      }
      marker.setPosition(newLocation);
      this.props.addMarker(marker);
      return marker;
    }
    return marker;




  }
  
  render() {
    return (
      <div id="map-container">
        <div ref={(map => {this.mapInstance = map})} 
         style={{height: '500px', width: '500px'}}>
       </div>
     </div>
    );
  }
}

export default GoogleMap;