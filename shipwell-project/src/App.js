import React, { Component } from 'react';
import GoogleMap from './Map';
import Address from './Address';
// import fetch from 'node-fetch';
const google = window.google
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address1: '',
      address2: '',
      lat: 30.2672,
      lng: -97.7431,
      startLocation: {
        lat: 0,
        lng: 0
      },
      endLocation: {
        lat: 0,
        lng: 0
      },
      markers: [],
      marker1: new google.maps.Marker({}),
      marker2: new google.maps.Marker({}),
      route:  directionsService.route({
        travelMode: 'DRIVING'
        }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        }  
      })
    }
  }
  handleAddressChange1(newAddress) {
    this.setState({
      address1: newAddress
    })
  }
  handleAddressChange2(newAddress) {
     this.setState({
      address2: newAddress
    })
  }
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
  addMarker(newMarker) {
    this.setState(prevState => ({
      markers: [...prevState.markers, newMarker]
    }));
  }
  removeMarkers() {
    this.setState({
      markers: []
    })
  }
  replaceMarker(index, newMarker) {
    this.setState(prevState => ({
      markers: prevState.markers.splice(index, 1, newMarker)
    }));
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
  updateRoute(origin, destination) {

  }
  render() {
    return (
      <div className="App">      
        <Address address={this.state.address1} updateLocation={this.updateStartLocation.bind(this)} handleChange={this.handleAddressChange1.bind(this)} />
        <Address address={this.state.address2} updateLocation={this.updateEndLocation.bind(this)} handleChange={this.handleAddressChange2.bind(this)} />
        <button type="button" onClick={() => this.handleClick()}>Search</button>
        <GoogleMap lat={this.state.lat} lng={this.state.lng} start={this.state.marker1} end={this.state.marker2} updateStart={this.updateMarker1.bind(this)}
          startPosition={this.state.startLocation} endPosition={this.state.endLocation} updateEnd={this.updateMarker2.bind(this)} 
      
        />           
      </div>
        
    );
  }
}

export default App;
