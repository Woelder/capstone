import React, { useState, useEffect, useRef } from "react";
import * as _ from "lodash";
import axios from 'axios'
import MapContainer from "../Comp/MapContainer";
//This is to replace elements on the screen that use location for more efficent rerenders
export default function Location(props) {

    const [restaurants,setRestaurants] = useState("needCall");
    const [locations, setLocations] = useState("empty");

    if(restaurants === "needCall" && props.isGeolocationAvailable && props.isGeolocationEnabled && props.coords){
        axios({
            method: "GET",
            url:
                "https://developers.zomato.com/api/v2.1/geocode?lat="+ props.coords.latitude +"&lon="+ props.coords.longitude +"",
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

            return mapComp;

}