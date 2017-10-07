import React, { Component } from 'react';
// import Marker from './Marker'
const google = window.google;

class GoogleMap extends Component {
  componentDidMount() {
    // initialize map
    this.map = new google.maps.Map(this.mapInstance,{
       center: {lat: this.props.lat, lng: this.props.lng},
       zoom: 5
     });
  }
 
  // create/update markers and route before mounted component's props change
  componentWillReceiveProps(nextProps) {
    this.updateMarker(this.props.startPosition, nextProps.startPosition, 'start');
    this.updateMarker(this.props.endPosition, nextProps.endPosition, 'end');
    this.drawRoute();
  }
  updateMarker(location, newLocation, markerLabel) {
    // the the location doesn't match newLocation, that means we need update location
    if (location.lat !== newLocation.lat || location.lng !== newLocation.lng) {
      // check which marker needs to be updated
      markerLabel === 'start' ? 
        this.props.updateStart(this.map,newLocation): this.props.updateEnd(this.map,newLocation)
   
    }
  }
  calculateAndDisplayRoute(directionsService, directionsDisplay) {
    if (this.props.start.getPosition() === undefined) 
      return;
    directionsService.route({
      origin: { lat: this.props.start.getPosition().lat(), lng: this.props.start.getPosition().lng() },
      destination: { lat: this.props.end.getPosition().lat(), lng: this.props.end.getPosition().lng() },
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      }  
      
    });
  }
  drawRoute() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(this.map);
    this.calculateAndDisplayRoute(directionsService, directionsDisplay);
    

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