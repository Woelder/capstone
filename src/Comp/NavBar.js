import React, { useState } from "react";

import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink
} from "reactstrap";

const NavBar = props => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color="light" light>
				<NavbarBrand href="/" className="mr-auto">
					{/* <img src={require("./images/capstone-small.png")} alt="logo" /> */}
					Cuisine Coordinator
				</NavbarBrand>

				<Nav navbar>
					<NavItem>
						<NavLink href="/pages/home.jsx">Home</NavLink>
					</NavItem>
				</Nav>
				<Nav>
					<NavItem>
						<NavLink href="/pages/home.jsx">About</NavLink>
					</NavItem>
				</Nav>
			</Navbar>
		</div>
	);
};

export default NavBar;
