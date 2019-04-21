import React, { Component } from 'react';
import './LocationOverlay.css';

class LocationOverlay extends Component {

  render() {
    return (
      <div className="location_overlay">
		<div id="geo_loc">
			<div id="geo_loc_inner">
				<input id="geo_bar" type="text" placeholder="Search your area / apartment / pincode" />
				<button id="curr_loc"><i className="material-icons curr_icon">my_location</i>Detect Current Location</button>
				<div id="saved_loc_header"><span style={{textTransform: 'uppercase'}}>saved addresses</span></div>
				<div id="saved_add">
					<div id="add1" className="address_div"><span>Home - 118, old 7th cross, Kammanahalli Main Road, Kammanahalli</span></div>
					<div id="add2" className="address_div"><span>Home - Fleetwood apartment, room no 113, Hutchins Road</span></div>
					<div id="add3" className="address_div"><span>Home - Fleetwood apartment, room no 113, Hutchins Road</span></div>
					<div id="add4" className="address_div"><span>Home - Fleetwood apartment, room no 113, Hutchins Road</span></div>
					<div id="add5" className="address_div"><span>Home - Fleetwood apartment, room no 113, Hutchins Road</span></div>
					<div id="add6" className="address_div"><span>Home - Fleetwood apartment, room no 113, Hutchins Road</span></div>
					<div id="add7" className="address_div"><span>Home - Fleetwood apartment, room no 113, Hutchins Road</span></div>
					<div id="add8" className="address_div"><span>Home - Fleetwood apartment, room no 113, Hutchins Road</span></div>
					<div id="add9" className="address_div"><span>Home - Fleetwood apartment, room no 113, Hutchins Road</span></div>
					<div id="add10" className="address_div"><span>Home - Fleetwood apartment, room no 113, Hutchins Road</span></div>
					<div id="add11" className="address_div"><span>Home - Fleetwood apartment, room no 113, Hutchins Road</span></div>
					<div id="add12" className="address_div"><span>Home - Fleetwood apartment, room no 113, Hutchins Road</span></div>
				</div>
			</div>
		</div>
	</div>
    );
  }

}

export default LocationOverlay;
