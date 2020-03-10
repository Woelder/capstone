import React from "react";
import { withRouter } from "react-router-dom";

import Routes from "./Utils/Routes";
import "./App.css";
import * as firebase from "firebase";
export const fbcon = {
	apiKey: "AIzaSyDWgL4gjE-221TB_pxFHAWzKPYx2fbOUbI",
	authDomain: "cuisine-coordinator.firebaseapp.com",
	databaseURL: "https://cuisine-coordinator.firebaseio.com",
	projectId: "cuisine-coordinator",
	storageBucket: "cuisine-coordinator.appspot.com",
	messagingSenderId: "122176531777",
	appId: "1:122176531777:web:eb9118a63d0b9c1a90c5c0",
	measurementId: "G-T6M25VJTDV"
};
let setup = firebase.initializeApp(fbcon); // this is what you use for firebase functionality
//let fb = setup.database().ref('Groups/Group1/chat')
function App() {
	const childProps = {
		fire: setup
	};

	return (
		<div className="App">
			<script src="/__/firebase/7.8.2/firebase-app.js"></script>
			<script src="/__/firebase/7.8.2/firebase-analytics.js"></script>
			<script src="/__/firebase/init.js"></script>
			<main>
				<Routes childProps={childProps} />
			</main>
		</div>
	);
}

export default withRouter(App);
