import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
	width: "100%",
	height: "50%"
};

export class MapContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			//we will access the array of json object returned from zomato here and adds the points to the map as markers below.These are for testing
			locationsOfResturaunts: props.resCoords
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
					title={resturaunt.name}
					onClick={() => console.log("You clicked me!")} //make this launch a pop up with other resturaunt info from the json array
				/>
			);
		});
	};

	render() {
		return (
			<Map
				google={this.props.google}
				zoom={14}
				style={mapStyles}
				initialCenter={this.props.initCoords}
			>
				{this.displayMarkers()}
			</Map>
		);
	}
}
export default GoogleApiWrapper({
	apiKey: "noKey"
})(MapContainer);
