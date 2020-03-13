import React from "react";
import Chat from "../Comp/Chat";
import queryString from "querystring";
import { geolocated } from "react-geolocated";
import NavBar from "../Comp/NavBar";
import MapContainer from "../Comp/MapContainer";
import { Table, Button } from "reactstrap";
import "../App.css";
import ResturauntList from "../Comp/ResturauntList";

export function group(props) {
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
						<ResturauntList />
					</td>
				</tr>
			</Table>

			{ <MapContainer></MapContainer> }
		</div>
	);
}

export default geolocated({
	positionOptions: {
		enableHighAccuracy: true
	},
	userDecisionTimeout: 5000
})(group);
