import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert, Table } from 'reactstrap';
import { UserTable } from "../UserTable";

export const Crud = (props) => {
	const [name, setName] = useState("");
	const [bio, setBio] = useState("");

	const [error, setError] = useState("");

	const [data, setData] = useState([]);

	useEffect(() => {
		if(data.length === 0) {
			axios.get("http://www.localhost:4000/api/users")
				 .then(res => {
				 	setData(res.data)
				 })
				 .catch(err => {
				 	console.log(err);
				 })
		}
	}, [data])

	const handleChanges = (event) => {
		if(event.target.name === "name") {
			setName(event.target.value);
		}
		if(event.target.name === "bio") {
			setBio(event.target.value)
		}
		//[event.target.name]: event.target.value
	}

	return (
		<Container>
		<Row>
			<Col sm={{ size: 6, offset: 3 }}>
			<Alert color="danger">warning for later</Alert>
			</Col>
		</Row>
		<Row>
		<Col sm={{ size: 7 }}>
		<Table dark>
			<thead>
				<tr>
					<th>ID</th>
					<th>NAME</th>
					<th>BIO</th>
				</tr>
			</thead>
			<tbody>
				{data.map(obj => (
					<UserTable key={obj.id} id={obj.id} name={obj.name} bio={obj.bio} />
				))}
			</tbody>
		</Table>
		</Col>
		<Col sm={{ size: 4, offset: 1 }}>
		<Form>
      		<Row>
      			<Col>
      			<br/>
        		<Label className="text-light" for="Name">Name</Label>
        		<Input size="md" type="text" name="name" placeholder="name" onChange={handleChanges} />
        		</Col>
        	</Row>
      		<Row>
      			<Col>
        		<Label className="text-light" for="Bio">Bio</Label>
        		<Input size="md" type="text" name="bio" placeholder="bio" onChange={handleChanges} />
        		</Col>
        	</Row>
        	<br/>
        	<Row>
        		<Col>
        		<Button color="primary" bsSize="lg" block>POST</Button>
        		</Col>
        	</Row>
      	</Form>
      	</Col>
      	</Row>
      	</Container>

	);
};