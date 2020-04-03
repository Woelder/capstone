import React from "react";

import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';
;

const AnyReactComponent = ({ text }) => <div><RoomIcon fontSize={"large"} htmlColor={"#c82a2b"}></RoomIcon></div>;
//This could make hoverable markers but will take work. 
export default function MapContainer(props){


	const displayMarkers = () => {
		return props.resCoords.map((resturaunt, index) => {
			return (
				<marker
					
					lat={resturaunt.latitude}
					lng={resturaunt.longitude}
					text={resturaunt.name}
					
				/>
			);
		});
	};


		return (
			<div>
				<div>
					<table>
						<th>Resturaunt List</th>

						{props.resCoords.map((res, index) => {
							return (
								<tr>
									<td>
										Resturaunt Name: {res.name}
										<br></br>
										Location: {res.city}
										<br></br>
									</td>
								</tr>
							);
						})}
					</table>


					<div style={{ height: '100vh', width: '100%' }}>
					<GoogleMapReact
					   bootstrapURLKeys={{ key: "" }}
					defaultCenter={{lat: parseFloat(props.initCoords.lat), lng: parseFloat(props.initCoords.lng)}}
					defaultZoom={14}
				 
					>
					{props.resCoords.map(place => (
						<AnyReactComponent
							key={place.name}
							text={place.name}
							lat={place.latitude}
							lng={place.longitude}
						/>
						))}
					
					</GoogleMapReact>
					</div>
				</div>
			</div>
		);
	

}