import React, { Component } from 'react';
const google = window.google
class Address extends Component {
  handleChange(e) {
    google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
      this.place = this.autocomplete.getPlace();
      this.props.handleChange(this.place.formatted_address);
      if (!this.place.geometry)
        return;
      this.props.updateLocation({lat: this.place.geometry.location.lat(), lng: this.place.geometry.location.lng()}) 
    });
    
  }
  componentDidMount() {
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