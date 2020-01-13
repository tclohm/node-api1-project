import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button } from "reactstrap";
import axios from "axios";

export const UserTable = (props) => {

	const [message, setMessage] = useState("");
	const [feedback, setFeedback] = useState(false);

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

	const alertTimer = () => {
		setFeedback(true)
		setTimeout(() => {
			setFeedback(false)
		}, 1000)
	}

	return (
			<tr key={id}>
				<th scope="row"><Badge color="light">{id}</Badge></th>
				<td><Link to={toLink}>{name}</Link></td>
				<td>{bio}</td>
				<td><Button onClick={deleteByID}><i class="fas fa-trash"></i></Button></td>
			</tr>
	);
}