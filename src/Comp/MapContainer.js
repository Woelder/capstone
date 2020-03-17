import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { Modal } from "reactstrap";
const mapStyles = {
	width: "100%",
	height: "50%"
};

export class MapContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			//we will access the array of json object returned from zomato here and adds the points to the map as markers below.These are for testing
			locationsOfResturaunts: [
				{ lat: 47.49855629475769, lng: -122.14184416996333 },
				{ latitude: 47.359423, longitude: -122.021071 },
				{ latitude: 47.2052192687988, longitude: -121.988426208496 },
				{ latitude: 47.6307081, longitude: -122.1434325 },
				{ latitude: 47.3084488, longitude: -122.2140121 },
				{ latitude: 47.5524695, longitude: -122.0425407 }
			]
		};
	}

	displayMarkers = () => {
		return this.state.locationsOfResturaunts.map((resturaunt, index) => {
			return (
				<Marker
					key={index}
					id={index}
					position={{
						lat: resturaunt.latitude,
						lng: resturaunt.longitude
					}}
					onClick={() =>
						//make  a popup to show restaurant info based on an array of restaurants
						console.log(
							"You clicked marker at Lat: " +
								resturaunt.latitude +
								"and long: " +
								resturaunt.longitude
						)
					} //make this launch a pop up with other resturaunt info from the json array
				/>
			);
		});
	};

	render() {
		return (
			<Map
				google={this.props.google}
				zoom={8}
				style={mapStyles}
				initialCenter={{ lat: 47.444, lng: -122.176 }}
			>
				{this.displayMarkers()}
			</Map>
		);
	}
}
export default GoogleApiWrapper({
	apiKey: "AIzaSyAtmfFQwqUBpIWzo_y_IsUAvQ7fomnbBZM"
})(MapContainer);
