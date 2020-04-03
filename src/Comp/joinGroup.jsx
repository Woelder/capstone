

export default function joinGroup(props) {
	//let newGroup = props.fire.database().ref('Groups/' + nanoid('2346789ABCDEFGHJKLMNPQRTUVWXYZ_abcdefghjklmnpqrtwxyz-', 10));
	let name = prompt("Enter your Name:");
	if (name === null || name === "") {
		return;
	} else {
		let groupID = prompt("Enter group id:");
		if (groupID === null || groupID === "") {
			return;
		} else
			props.history.push(
				"/group?id=" + groupID + "&user=" + (name ?? "noName")
			);
	}
}
