import React from "react";
import createGroup from "../Comp/createGroup";
import NavBar from "../Comp/NavBar";
import joinGroup from "../Comp/joinGroup";
import { Jumbotron, Container } from "reactstrap";

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
				<div class="jt">
					<h2>Cuisine Coordinator</h2>
					<h3>The easy way to meet and eat!</h3>
				</div>

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
