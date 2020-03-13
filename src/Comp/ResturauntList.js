import React, { Component } from "react";

const ResturauntList = props => {
	const axios = require("axios");
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
			const restaurantArray = [];
			for (var i = 0; i < data.nearby_restaurants.length; i++) {
				restaurantArray.push(data.nearby_restaurants[i].restaurant.name);
				console.log(restaurantArray[i]);
				return (
					<div>
						<h1>HI INSDIFR LOOP</h1>
						<p>{restaurantArray[i]}</p>
					</div>
				);
			}
		})
		.catch(error => {
			console.log(error);
		});

	return <div>OUTSIDE LOOP</div>;
};
export default ResturauntList;
