import React, { useState, useEffect, useRef } from "react";
import * as _ from "lodash";
import axios from "axios";
import MapContainer from "../Comp/MapContainer";
import { getCenter } from "geolib";

//This is to replace elements on the screen that use location for more efficent rerenders
export default function Location(props) {
	const [toReturn, setToReturn] = useState("empty");
	const [restaurants, setRestaurants] = useState("needCall");
	const [locations, setLocations, locationsRef] = useStateRef("empty");
	const restArray = ["rest1", "rest2"];
	useEffect(() => {
		if (
			locations === "empty" &&
			props.isGeolocationAvailable &&
			props.isGeolocationEnabled &&
			props.coords
		) {
			props.fireLoc.push({
				latitude: props.coords.latitude,
				longitude: props.coords.longitude
			});
			props.fireLoc.on("child_added", function(snapshot) {
				let data = snapshot.val();
				let toUpdateLoc = [];
				if (locationsRef.current === "empty") {
					toUpdateLoc.push(data); //needs to be in array format
					setLocations(toUpdateLoc);
				} else {
					toUpdateLoc = _.clone(locationsRef.current);
					toUpdateLoc.push(data);
					setLocations(toUpdateLoc);
				}
			});
		}
	}, [
		locations,
		locationsRef,
		props.coords,
		props.fireLoc,
		props.isGeolocationAvailable,
		props.isGeolocationEnabled,
		setLocations
	]);

	useEffect(() => {
		if (
			restaurants.locLength !== locations.length &&
			props.isGeolocationAvailable &&
			props.isGeolocationEnabled &&
			props.coords &&
			locations !== "empty"
		) {
			let locationCenter = getCenter(locations);
			axios({
				method: "GET",
				url:
					"https://developers.zomato.com/api/v2.1/geocode?lat=" +
					locationCenter.latitude +
					"&lon=" +
					locationCenter.longitude +
					"",
				headers: {
					"user-key": "15fc15cb049a5b5b668d903cdd986327",
					"content-type": "Accept: application/json"
				}
			})
				.then(response => {
					var data = response.data;
					// var restArray = [];
					for (var i = 0; i < data.nearby_restaurants.length; i++) {
						restArray.push(data.nearby_restaurants[i].restaurant.name);
					}
					setToReturn(restArray);
					data.locLength = locations.length;
					setRestaurants(data);
					return toReturn;
				})
				.catch(error => {
					console.log(error);
				});
		}
	}, [
		locations,
		props.coords,
		props.isGeolocationAvailable,
		props.isGeolocationEnabled,
		restaurants.locLength
	]);

	let mapComp = [];
	if (restaurants !== "needCall") {
		let initCoords = {
			lat: restaurants.location.latitude,
			lng: restaurants.location.longitude
		};
		let resCoords = [];

		restaurants.nearby_restaurants.forEach(rest => {
			resCoords.push({
				latitude: rest.restaurant.location.latitude,
				longitude: rest.restaurant.location.longitude,
				name: rest.restaurant.name,
				phone: rest.restaurant.phone,
				city: rest.restaurant.location.city
			});
		});

		mapComp.push(
			<MapContainer initCoords={initCoords} resCoords={resCoords} />
		);
	}

	return (
		<div>
			<div>{mapComp}</div>
		</div>
	);
}

function useStateRef(initialValue) {
	const [value, setValue] = useState(initialValue);

	const ref = useRef(value);

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return [value, setValue, ref];
}
