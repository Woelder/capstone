import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Popup from "reactjs-popup";
const mapStyles = {
	width: "100%",
	height: "75%"
};

export class MapContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			//we will access the array of json object returned from zomato here and adds the points to the map as markers below.These are for testing
			locationsOfResturaunts: props.resCoords,
		};
	}

	displayMarkers = () => {
		return this.props.resCoords.map((resturaunt, index) => {
			return (
				<Marker
					key={index}
					id={index}
					position={{
						lat: resturaunt.latitude,
						lng: resturaunt.longitude
					}}
					title={resturaunt.name}
					onClick={() => {
						this.modalClicked(resturaunt);
					}}
				/>
			);
		});
	};

	render() {
		return (
			<div>
				<div>
					<table>
						<th>Resturaunt List</th>
							
						{this.props.resCoords.map((res, index) => {
							var url =
								"https://www.google.com/maps/dir/?api=1&destination=" +
								res.address;
							return (
								<tr>
									<td>
										Resturaunt Name: {res.name}
										<br></br>
										Address:
										{res.address}
										<br />
										Rating: {res.rating} ({res.ratingText})
										<br />
										Cuisine Type: {res.cuisines}
										<br />
										Menu: <a href={res.menuLink}>Link</a>
										<br />
										<button id="AsDownload">
											<a href={url} target="_blank">
												Navigate
											</a>
										</button>
									</td>
								</tr>
							);
						})}
					</table>

					<Map
						google={this.props.google}
						zoom={14}
						style={mapStyles}
						initialCenter={this.props.initCoords}
					>
						{this.displayMarkers()}
					</Map>
				</div>
			</div>
		);
	}

	modalClicked(resturaunt) {
		var name = resturaunt.name;
		var city = resturaunt.city;
		var phone = resturaunt.phone;
		var address = resturaunt.address;
		alert(name + "\n" + city + "\n" + phone);

		//this return doesnt work AT ALL
		return (
			<div>
				<Popup position="right center">
					<div>Popup content here !!</div>
				</Popup>
			</div>
		);
	}
}
export default GoogleApiWrapper({
	apiKey: "AIzaSyDh2t0tc0BzH9alE4K0XFTy_mk8HeZX_oA"
})(MapContainer);

