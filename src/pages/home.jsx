import React from "react";
import createGroup from "../Comp/createGroup";
import NavBar from "../Comp/NavBar";

export default function home(props) {
	const toCreateGroup = () => {
		createGroup(props);
	};

	return (
		<div>
			<NavBar></NavBar>
			<h1>Home</h1>
			<button onClick={toCreateGroup}>Create</button>
			<button>Join</button>
		</div>
	);
}
