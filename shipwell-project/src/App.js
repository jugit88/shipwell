import React, { Component } from 'react';
import GoogleMap from './Map';
import Address from './Address';

const google = window.google //read in global google from google map api
const directionsService = new google.maps.DirectionsService;
const directionsDisplay = new google.maps.DirectionsRenderer({
  draggable: true
});
const initLocation = {lat: 30.2672, lng: -97.7431}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startLocation: {
        lat: 0,
        lng: 0
      },
      endLocation: {
        lat: 0,
        lng: 0
      },
      marker1: new google.maps.Marker({}),
      marker2: new google.maps.Marker({}),
    }
  }
  /* State Handlers */

  updateStartLocation(location) {
    this.setState({
      startLocation: {
        lat: location.lat,
        lng: location.lng
      }
    })

  }
  updateEndLocation(location) {
    this.setState({
      endLocation: {
        lat: location.lat,
        lng: location.lng
      }
    })
  }
  updateMarker1(map, newPosition) {
    let tempMarker = this.state.marker1;
    tempMarker.setPosition(newPosition);
    tempMarker.setMap(map);
    this.setState({
      marker1: tempMarker
    });
  }
  updateMarker2(map, newPosition) {
    let tempMarker = this.state.marker2;
    tempMarker.setPosition(newPosition);
    tempMarker.setMap(map);
    this.setState({
      marker2: tempMarker
    });
  }
  
  render() {
    return (
      <div className="App">      
        <Address updateLocation={this.updateStartLocation.bind(this)}  />
        <Address updateLocation={this.updateEndLocation.bind(this)}  />
        <GoogleMap initLocation={initLocation} start={this.state.marker1} end={this.state.marker2} updateStart={this.updateMarker1.bind(this)}
          startPosition={this.state.startLocation} endPosition={this.state.endLocation} updateEnd={this.updateMarker2.bind(this)} 
          directionsService={directionsService} directionsDisplay={directionsDisplay}  
        />           
      </div>      
    );
  }
}

export default App;
