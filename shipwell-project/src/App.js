import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address1: '',
      address2: '',
    }
    this.initMap = this.initMap.bind(this);
  }
  // componentDidMount() {
  //  var map;
  //  map = new google.maps.Map(this.refs.map, {
  //     center: {lat: -34.397, lng: 150.644},
  //     zoom: 8
  //   });
  //  return map;
  // }
  initMap() { 
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
    return map;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div id="map"></div>
          <script>
            {this.initMap}   
          </script>
                  
            
       </div>
        
    );
  }
}

export default App;
