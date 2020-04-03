import React from "react";
import Chat from "../Comp/Chat";
import queryString from "querystring";
import { geolocated } from "react-geolocated";
import NavBar from "../Comp/NavBar";
import { Table } from "reactstrap";
import "../App.css";
import RestMap from "../Comp/locationGroup";


export function Group(props) {
	
	let query = queryString.parse(props.location?.search.substring(1));
	const fbChat = props.fire.database().ref("Groups/" + query.id + "/chat");
	const fbLoc = props.fire.database().ref("Groups/" + query.id + "/Locations");
	const fbRest = props.fire.database().ref("Groups/" + query.id + "/rest");

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
			<h1>Group ID: {query.id}</h1>
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
						<Chat fireChat={fbChat} username={query.user} />
					</td>
				</tr>
			</Table>

			<RestMap
				fireLoc={fbLoc}
				fireRest={fbRest}
				isGeolocationAvailable={props.isGeolocationAvailable}
				isGeolocationEnabled={props.isGeolocationEnabled}
				coords={props.coords}
			/>
		</div>
	);
}

export default geolocated({
	positionOptions: {
		enableHighAccuracy: true
	},
	userDecisionTimeout: 5000
})(Group);
