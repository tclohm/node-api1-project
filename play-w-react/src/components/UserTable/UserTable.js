import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";

export const UserTable = (props) => {

	const { id, name, bio } = props;
	const toLink = `crud/${id}`;

	return (
			<tr key={id}>
				<th scope="row"><Badge color="light">{id}</Badge></th>
				<td><Link to={toLink}>{name}</Link></td>
				<td>{bio}</td>
			</tr>
	);
}