import React from "react";
import queryString from "querystring";
import joinGroup from "../Comp/joinGroup";

export default function home(props) {
    const toJoinGroup = () => {
		joinGroup(props);
    };
    
    let query = queryString.parse(props.location?.search.substring(1));
    let name = prompt("Enter your Name:");

    if(query.id){
    props.history.push(
        "/group?id=" + query.id + "&user=" + (name ?? "noName")
    );}

	return (
		<div>
            Joining Group
            If fails please join manually
            <button  onClick={toJoinGroup}>
						Join
					</button>
		</div>
	);
}
