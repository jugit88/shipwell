import React, {Component} from 'react'

class Marker extends Component {

  renderMarker(newMarker) {
    // max number of markers is 2, if greater, remove markers from map and markers array
    if (this.props.markers.length >= 2) {
      this.props.markers.forEach((m) => {
        m.setMap(null);
      });
      this.props.removeMarkers()
      
    }
    // if a (lat,lng) exist(i.e not 0) set markers position to that location and add marker to markers array
    if (this.props.location.lat !== 0 && this.props.location.lng !== 0) {
      newMarker.setPosition(this.props.location);
      newMarker.setVisible(true); 
      this.props.addMarker(newMarker);
    }
  }
  createMarker() {
    let marker = new this.props.google.maps.Marker({
      map: this.props.map,
    });
    marker.setVisible(false);
    return marker;
  }
  render() {
    
    
  }
}
export default Marker