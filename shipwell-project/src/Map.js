import React, { Component } from 'react';
// import Marker from './Marker'
const google = window.google;
// const directionsService = new google.maps.DirectionsService;
// const directionsDisplay = new google.maps.DirectionsRenderer;
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
  calculateAndDisplayRoute(directionsService, directionsDisplay, newStart, newEnd) {
    // compare new and old props to see if markers have updated. If not, do not update route
    
    // does a marker exist at a specific location? If not, return.
    if (!this.props.start.getPosition() || !this.props.end.getPosition()) 
      return; 
    directionsService.route({
        origin: this.props.startPosition,
        destination: this.props.endPosition,
        travelMode: 'DRIVING'
        }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        }  
    })


  }
  drawRoute() {
    // create new direction service/render instances and inject new props of new markers into calculateandDisplay route
    this.props.directionsDisplay.setMap(this.map);
    this.calculateAndDisplayRoute(this.props.directionsService, this.props.directionsDisplay);
    

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