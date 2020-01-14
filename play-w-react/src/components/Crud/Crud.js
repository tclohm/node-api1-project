import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Label, Input, Alert, Table } from 'reactstrap';
import { UserTable } from "../UserTable";

export const Crud = (props) => {
	const [name, setName] = useState("");
	const [bio, setBio] = useState("");
	const [obj, setObj] = useState({name: "", bio: ""});
	const [message, setMessage] = useState("");
	const [data, setData] = useState([]);
	const [feedback, setFeedback] = useState(false);

	useEffect(() => {
			axios.get("http://www.localhost:4000/api/users")
				 .then(res => {
				 	setData(res.data)
				 })
				 .catch(err => {
				 	console.log(err);
				 })
	}, [data])

	const handleChanges = (event) => {
		setObj({...obj, [event.target.name]: event.target.value});
	}

	const post = (event) => {
		event.preventDefault();
		axios.post("http://www.localhost:4000/api/users", obj)
			 .then(res => {
			 	console.log(res)
			 	setMessage(res.statusText);
			 	alertTimer();
			 })
			 .catch(err => {
			 	console.log(err.status);
			 	setMessage(err.statusText);
			 	alertTimer();
			 })
		setObj({name: "", bio: ""})
	}

	const alertTimer = () => {
		setFeedback(true);
		setTimeout(() => {
			setFeedback(false);
		}, 2000);
	}

	return (
		<Container>
		<Row>
			{feedback ?
			<Col sm={{ size: 6, offset: 3 }}>
			<Alert color="success">{message}</Alert>
			</Col>
			:
			<></>
			}
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
        		<Input size="md" type="text" name="name" placeholder="name" value={obj.name} onChange={handleChanges} />
        		</Col>
        	</Row>
      		<Row>
      			<Col>
        		<Label className="text-light" for="Bio">Bio</Label>
        		<Input size="md" type="text" name="bio" placeholder="bio" value={obj.bio} onChange={handleChanges} />
        		</Col>
        	</Row>
        	<br/>
        	<Row>
        		<Col>
        		<Button color="primary" bsSize="lg" block onClick={post}>POST</Button>
        		</Col>
        	</Row>
      	</Form>
      	</Col>
      	</Row>
      	</Container>

	);
};