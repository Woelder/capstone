import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const mapStyles = {
	width: "100%",
	height: "50%"
};

export class MapContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			//we will access the array of json object returned from zomato here and adds the points to the map as markers below.These are for testing
			locationsOfResturaunts: props.resCoords,
			showModal: true,
			resLat: 12,
			resLong: 12,
			resName: "Harrys"
		};
	}

	displayMarkers = () => {
		return this.state.locationsOfResturaunts.map((resturaunt, index) => {
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
						// this.setState({
						// 	resName: resturaunt.name,
						// 	resLat: resturaunt.latitude,
						// 	resLong: resturaunt.longitude
						// });
						this.modalClicked();
					}}
				/>
			);
		});
	};

	render() {
		return (
			<div>
				<div>
					<Map
						google={this.props.google}
						zoom={14}
						style={mapStyles}
						initialCenter={this.props.initCoords}
					>
						{this.displayMarkers()}
					</Map>
				</div>

				<Modal show={this.state.showModal} onHide={this.close}>
					<ModalHeader toggle={this.open()}>
						<h1>Res Info</h1>
					</ModalHeader>
					<ModalBody>
						<p>Name: {this.state.resName}</p>
						<p>Lat: {this.state.resLat}</p>
						<p>Long: {this.state.resLong}</p>
					</ModalBody>
					<ModalFooter>
						<Button onClick={this.close}>Close</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}

	modalClicked() {
		this.setState({ showModal: true });
		alert("modalCLicked");
	}

	close() {
		this.setState({ showModal: false });
	}

	open() {
		this.setState({ showModal: true });
	}
}
export default GoogleApiWrapper({
	apiKey: "AIzaSyAtmfFQwqUBpIWzo_y_IsUAvQ7fomnbBZM"
})(MapContainer);
