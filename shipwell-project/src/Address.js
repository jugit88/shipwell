import React, { Component } from 'react';

const google = window.google

class Address extends Component {
  handleChange(e) {
    // autocomplete object is bound to the Autocomplete class, needs its own event listener
    google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
      // retrieve the place object(this.place) to access properties of the place 
      this.place = this.autocomplete.getPlace();
      // if there's no geometry, there's no location, therefore don't update location
      if (!this.place.geometry)
        return;
      this.props.updateLocation({lat: this.place.geometry.location.lat(), lng: this.place.geometry.location.lng()}) 
    });
    
  }
  componentDidMount() {
    // create autocomplete object to use for input text field
    this.autocomplete = new google.maps.places.Autocomplete(this.inputInstance); 
  }
  // to access dom elements use the ref attribute to integrate w/Google maps api
  render() {
    return(
     <div id="input-container" style={{textAlign: 'center'}}>
       <input ref={(input) => {this.inputInstance = input}} type="text" style={{width: '20%' }}onChange={this.handleChange.bind(this)} />
     </div>
    );
  }
}

export default Address;