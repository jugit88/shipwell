import React, { Component } from 'react';

const google = window.google;

class GoogleMap extends Component {
  // render map after component mounts in order to have access to DOM element with id/ref "map"
  componentDidMount() {
    // initialize map at Austin, TX :)
    this.map = new google.maps.Map(this.mapInstance,{
       center: this.props.initLocation,
       zoom: 8
     });
  }
 
  // create/update markers and route before mounted component's props change
  componentWillReceiveProps(nextProps) {
    // update start marker
    this.updateMarker(this.props.startPosition, nextProps.startPosition, 'start');
    // update end marker
    this.updateMarker(this.props.endPosition, nextProps.endPosition, 'end');
    // draw/update route
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
    // does a marker(s) exist at a specific location? If no markers, return. If one marker exists, pan to that location.
    if (!this.props.start.getPosition() && !this.props.end.getPosition()) 
      return;
    if (!this.props.start.getPosition())
      this.map.panTo(this.props.endPosition);
    if (!this.props.end.getPosition())
      this.map.panTo(this.props.startPosition);
    // both markers exist, draw the route between the two.
    else {
      directionsService.route({
        origin: {lat: this.props.start.getPosition().lat(), lng: this.props.start.getPosition().lng()},
        destination: {lat: this.props.end.getPosition().lat(), lng: this.props.end.getPosition().lng()},
        travelMode: 'DRIVING'
        }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        }  
      })  
    }
    


  }
  drawRoute() {
    // create new direction service/render instances and inject new props of new markers into calculateandDisplay route
    this.props.directionsDisplay.setMap(this.map);
    this.calculateAndDisplayRoute(this.props.directionsService, this.props.directionsDisplay);
    

  }
  
  // to access dom elements use the ref attribute to integrate w/Google maps api
  render() {
    return (
      <div id="map-container">
        <div ref={(map => {this.mapInstance = map})} 
         style={{height: '550px', width: '100%'}}>
       </div>
     </div>
    );
  }
}

export default GoogleMap;