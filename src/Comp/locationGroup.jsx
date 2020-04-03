import React, { useState, useEffect, useRef } from "react";
import * as _ from "lodash";
import axios from "axios";
import MapContainer from "../Comp/MapContainer";
import { getCenter } from "geolib";

//This is to replace elements on the screen that use location for more efficent rerenders
export default function Location(props) {

	const [restaurants, setRestaurants] = useState("needCall");
	const [locations, setLocations, locationsRef] = useStateRef("empty");

	useEffect(() => {
		if (
			locations === "empty" &&
			props.isGeolocationAvailable &&
			props.isGeolocationEnabled &&
			props.coords
		) {
			props.fireLoc.once("value").then(function(snapshot) {
				let data = snapshot.val();
				if(data === null){ //if creator of group this will be empty 
					data = [];
				} else {
					data = Object.values(data);
				}
				
				let toUpdateLoc = [];
				
				let lastIdInSnapshot = props.fireLoc.push({
					latitude: props.coords.latitude,
					longitude: props.coords.longitude
				}).key;
				data.push({ 
					latitude: props.coords.latitude,
					longitude: props.coords.longitude
				});
				props.fireLoc
				.orderByKey()
				.startAt(lastIdInSnapshot)
				.limitToLast(1)
				.on("child_added", function(newMessSnapShot) {
					if (newMessSnapShot.key === lastIdInSnapshot) {
						return;
					}
					let newData = newMessSnapShot.val();
					toUpdateLoc = _.clone(locationsRef.current);
					toUpdateLoc.push(newData);
					setLocations(toUpdateLoc);
				});
				setLocations(data);
			})

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
					"user-key": "e0537c1fa4f497bce67a21f601b7bcf4",
					"content-type": "Accept: application/json"
				}
			})
				.then(response => {
					var data = response.data;
					 var restArray = [];
					for (var i = 0; i < data.nearby_restaurants.length; i++) {
						restArray.push(data.nearby_restaurants[i].restaurant.name);
					}
				
					data.locLength = locations.length;
					setRestaurants(data);
				
				})
				.catch(error => {
					console.log(error);
				});
		}
	}, [locations, props.coords, props.isGeolocationAvailable, props.isGeolocationEnabled,restaurants.locLength]);

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
			<MapContainer initCoords={initCoords} resCoords={resCoords} key={resCoords} />
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
