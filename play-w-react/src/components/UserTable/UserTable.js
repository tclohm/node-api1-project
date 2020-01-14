import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Input } from "reactstrap";
import axios from "axios";

export const UserTable = (props) => {

	const { id, name, bio } = props;
	const toLink = `crud/${id}`;

	const [newObj, setNewObj] = useState({name: name, bio: bio});
	const [message, setMessage] = useState("");
	const [feedback, setFeedback] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

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
		setNewObj({...newObj, [event.target.name]: event.target.value})
	}

	const put = (event) => {
		axios.put(`http://www.localhost:4000/api/users/${id}`, newObj)
			 .then(res => {
			 	console.log(res);
			 	setIsEditing(false);
			 })
			 .catch(err => {
			 	console.log(err);
			 })
	}

	const cancel = (event) => {
		setIsEditing(false);
	}

	return (
			<tr key={id}>
				<th scope="row"><Badge color="light">{id}</Badge></th>
				{isEditing ?
					<>
					<td><Input size="sm" type="text" name="name" placeholder="name" value={newObj.name} onChange={handleChanges} /></td>
					<td><Input size="sm" type="text" name="bio" placeholder="bio" value={newObj.bio} onChange={handleChanges} /></td>
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