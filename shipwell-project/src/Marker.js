import React, {Component} from 'react'

class Marker extends Component {
	renderMarkers() {
   if (this.props.location.lat != 0 && this.props.location.lng != 0) {
    let marker = new this.props.google.maps.Marker({
      map: this.props.map,
      position: this.props.location
    });
   }  
  }
  render() {
    return (
      <div> 
        {this.renderMarkers()} 
      </div>
    );
  }
}
export default Marker