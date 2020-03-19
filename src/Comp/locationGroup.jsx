import React, { useState, useEffect, useRef } from "react";
import * as _ from "lodash";
import axios from 'axios'
import MapContainer from "../Comp/MapContainer";
import { getCenter } from 'geolib';

//This is to replace elements on the screen that use location for more efficent rerenders
export default function Location(props) {

    const [restaurants,setRestaurants] = useState("needCall");
    const [locations, setLocations, locationsRef] = useStateRef("empty");


    useEffect(() => {
        if(locations === "empty" && props.isGeolocationAvailable && props.isGeolocationEnabled && props.coords){
            props.fireLoc.push({'latitude': props.coords.latitude, 'longitude': props.coords.longitude});
            props.fireLoc.on("child_added", function(snapshot){
                let data = snapshot.val();
                let toUpdateLoc = []; 
                if(locationsRef.current === "empty"){
                    toUpdateLoc.push(data) //needs to be in array format
                    setLocations(toUpdateLoc);
                }else{
                   
                    toUpdateLoc = _.clone(locationsRef.current);
                    toUpdateLoc.push(data);
                    setLocations(toUpdateLoc);
                }

            })
           
        }

       

    },[locations, locationsRef, props.coords, props.fireLoc, props.isGeolocationAvailable, props.isGeolocationEnabled, setLocations])
   
    useEffect(() => {
    if(restaurants.locLength !== locations.length && props.isGeolocationAvailable && props.isGeolocationEnabled && props.coords && locations !== "empty"){
        let locationCenter = getCenter(locations);
        axios({
            method: "GET",
            url:
                "https://developers.zomato.com/api/v2.1/geocode?lat="+ locationCenter.latitude +"&lon="+ locationCenter.longitude +"",
            headers: {
                "user-key": "15fc15cb049a5b5b668d903cdd986327",
                "content-type": "Accept: application/json"
            }
        })
            .then(response => {
                var data = response.data;
                data.locLength = locations.length
                setRestaurants(data);
            })
            .catch(error => {
                console.log(error);
            });}

        },[locations, props.coords, props.isGeolocationAvailable, props.isGeolocationEnabled, restaurants.locLength])


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

function useStateRef(initialValue) {
	const [value, setValue] = useState(initialValue);

	const ref = useRef(value);

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return [value, setValue, ref];
}
