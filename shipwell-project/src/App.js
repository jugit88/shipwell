import React, { Component } from 'react';
import GoogleMap from './Map';
import Address from './Address';
// import fetch from 'node-fetch';

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
      markers: []

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
  replaceMarker(newMarker) {
    this.setState(prevState => ({
      markers: prevState.markers.splice(0, 1, newMarker)
    }));
  }
  render() {
    return (
      <div className="App">      
        <Address address={this.state.address1} updateLocation={this.updateStartLocation.bind(this)} handleChange={this.handleAddressChange1.bind(this)} />
        <Address address={this.state.address2} updateLocation={this.updateEndLocation.bind(this)} handleChange={this.handleAddressChange2.bind(this)} />
        <button type="button" onClick={() => this.handleClick()}>Search</button>
        <GoogleMap lat={this.state.lat} lng={this.state.lng}  
          startPosition={this.state.startLocation} endPosition={this.state.endLocation} 
          markers={this.state.markers} replaceMarker={this.replaceMarker.bind(this)} removeMarkers={this.removeMarkers.bind(this)} addMarker={this.addMarker.bind(this)}
        />           
      </div>
        
    );
  }
}

export default App;
