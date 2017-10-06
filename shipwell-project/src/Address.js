import React, { Component } from 'react';
// need to access global google to use google places library
const google = window.google

class Address extends Component {
  handleChange(e) {
    // autocomplete object is bound to the Autocomplete class, needs its own event listener
    google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
      // retrieve the place object(this.place) to access properties of the place 
      this.place = this.autocomplete.getPlace();
      this.props.handleChange(this.place.formatted_address);
      // if there's no geometry, there's no location, therefore don't update location
      if (!this.place.geometry)
        return;
      // update (lat, lng) via the lat() lng() methods
      this.props.updateLocation({lat: this.place.geometry.location.lat(), lng: this.place.geometry.location.lng()}) 
    });
    
  }
  componentDidMount() {
    // create autocomplete object to use for input text field
    this.autocomplete = new google.maps.places.Autocomplete(this.inputInstance); 
  }
  render() {
    return(
     <div id="input-container">
       <input ref={(input) => {this.inputInstance = input}} type="text"  onChange={this.handleChange.bind(this)} />
     </div>
    );
  }
}

export default Address;