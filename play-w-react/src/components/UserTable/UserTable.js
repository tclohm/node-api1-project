import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Input } from "reactstrap";
import axios from "axios";

export const UserTable = (props) => {

	const [newObj, setNewObj] = useState({name: "", bio: ""});
	const [message, setMessage] = useState("");
	const [feedback, setFeedback] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const { id, name, bio } = props;
	const toLink = `crud/${id}`;

	const deleteByID = (event) => {
		axios.delete(`http://www.localhost:4000/api/users/${id}`)
			 .then(res => {
			 	setMessage("deleted");
			 	alertTimer();
			 })
			 .catch(err => {
			 	console.log(err);
			 })
	}

	const editByID = (event) => {
		setIsEditing(true)
	}

	const alertTimer = () => {
		setFeedback(true)
		setTimeout(() => {
			setFeedback(false)
		}, 1000)
	}

	const handleChanges = (event) => {

	}

	const put = (event) => {
		console.log("put")
	}

	const cancel = (event) => {
		setIsEditing(false);
	}

	return (
			<tr key={id}>
				<th scope="row"><Badge color="light">{id}</Badge></th>
				{isEditing ?
					<>
					<td><Input size="sm" type="text" name="name" placeholder="name" value={name} /></td>
					<td><Input size="sm" type="text" name="bio" placeholder="bio" value={bio} /></td>
					</>
				:
					<>
					<td><Link to={toLink}>{name}</Link></td>
					<td>{bio}</td>
					</>
				}
				{isEditing ?
					<td><Button onClick={put}><i class="far fa-paper-plane"></i></Button></td>
				:
					<td><Button onClick={editByID}><i class="fas fa-edit"></i></Button></td>
				}
				{isEditing ? 
				<td><Button onClick={cancel}><i class="fas fa-times"></i></Button></td>
				:
				<td><Button onClick={deleteByID}><i class="fas fa-trash"></i></Button></td>
				}
			</tr>
	);
}