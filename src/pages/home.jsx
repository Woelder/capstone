import React from "react";
import createGroup from "../Comp/createGroup";
import NavBar from "../Comp/NavBar";
import joinGroup from "../Comp/joinGroup";

export default function home(props) {
	const toCreateGroup = () => {
		createGroup(props);
	};
	const toJoinGroup = () => {
		joinGroup(props);
	};

	return (
		<div>
			<NavBar></NavBar>
			<div class="container">
				<h2>Cuisine Coordinator</h2>
				<div class="buttonWrapper">
					<button class="homePageButtons" onClick={toCreateGroup}>
						Create
					</button>
					<button class="homePageButtons" onClick={toJoinGroup}>
						Join
					</button>
				</div>
			</div>
		</div>
	);
}
