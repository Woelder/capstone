import React, {useState} from "react";
import Chat from "../Comp/Chat";
import queryString from "querystring";
import { geolocated } from "react-geolocated";
import NavBar from "../Comp/NavBar";
import MapContainer from "../Comp/MapContainer";
import { Table, Button } from "reactstrap";
import "../App.css";

export function Group(props) {

	const [restaurants,setRestaurants] = useState("needCall");
	const axios = require("axios");
	let query = queryString.parse(props.location?.search.substring(1));
	let fb = props.fire.database().ref("Groups/" + query.id + "/chat");

	let geoDisplay = !props.isGeolocationAvailable ? (
		<div>Your browser does not support Geolocation</div>
	) : !props.isGeolocationEnabled ? (
		<div>Geolocation is not enabled</div>
	) : props.coords ? (
		<table>
			<tbody>
				<tr>
					<td>latitude</td>
					<td>{props.coords.latitude}</td>
				</tr>
				<tr>
					<td>longitude</td>
					<td>{props.coords.longitude}</td>
				</tr>
			</tbody>
		</table>
	) : (
		<div>Getting the location data&hellip; </div>
	);


	if(restaurants === "needCall"){
	axios({
		method: "GET",
		url:
			"https://developers.zomato.com/api/v2.1/geocode?lat=35.308748099999995&lon=-80.74116819999999",
		headers: {
			"user-key": "15fc15cb049a5b5b668d903cdd986327",
			"content-type": "Accept: application/json"
		}
	})
		.then(response => {
			var data = response.data;

			setRestaurants(data);
		})
		.catch(error => {
			console.log(error);
		});}


		let mapComp = [];
		if(restaurants !== "needCall"){
			let initCoords = {'lat': restaurants.location.latitude, 'lng': restaurants.location.longitude};
			let resCoords = [];

			restaurants.nearby_restaurants.forEach((rest) => {
				resCoords.push({'latitude': rest.restaurant.location.latitude, 'longitude': rest.restaurant.location.longitude, 'name': rest.restaurant.name});
			})

			mapComp.push(<MapContainer initCoords={initCoords} resCoords={resCoords}/>);
		}

	return (
		<div>
			<NavBar></NavBar>
			<h1>Group Name</h1>
			<button class="filter">Filters</button>
			<br></br>
			<Table striped bordered hover variant="dark">
				<tr>
					<th>Location Info</th>
					<th>Chat</th>
				</tr>
				<tr>
					<td> {geoDisplay}</td>

					<td>
						<Chat fireChat={fb} />
					</td>
					<td>
					
					</td>
				</tr>
			</Table>

			{mapComp}
		</div>
	);
}

export default geolocated({
	positionOptions: {
		enableHighAccuracy: true
	},
	userDecisionTimeout: 5000
})(Group);
