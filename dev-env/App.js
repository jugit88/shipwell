import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address1: '',
      address2: '',
      lat: 30.2672,
      lng: -97.7431
    }
  }
  render() {
    return (
      <div className="App">
       
        <div style={{height:'80%'}}>
          <Map lat={this.state.lat} lng={this.state.lng}/>           
        </div>
  
      </div>
        
    );
  }
}

export default App;
