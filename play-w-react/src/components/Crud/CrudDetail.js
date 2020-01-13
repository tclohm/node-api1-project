import React, { useEffect, useState } from "react";
import sauron from "./assets/sauron.gif"
import axios from "axios";
import { Card, CardTitle, CardText, CardBody, Container, Row, Col, Form, Label, Input, Button } from "reactstrap";

import "../../App.css";

export const CrudDetail = (props) => {

	const id = props.match.params.id;
	const [obj, setObj] = useState({name: "", bio: ""});
	const [newObj, setNewObj] = useState({name: "", bio: ""});

	useEffect(() => {
		
		axios.get(`http://www.localhost:4000/api/users/${id}`)
			 .then(res => {
				setObj({name: res.data.person.name, bio: res.data.person.bio})
			})
			 .catch(err => {
				console.log(err)
			})
	}, [obj])

	const handleChanges = (event) => {
		if(event.target.name === "name") {
			setNewObj({...newObj, [event.target.name]: event.target.value})
		}
		if(event.target.name === "bio") {
			setNewObj({...newObj, [event.target.name]: event.target.value})
		}
	}

	const submitPut = (event) => {
		event.preventDefault();
		axios.put(`http://www.localhost:4000/api/users/${id}`, newObj)
			 .then(res => {
			 	props.history.push("/crud")
			 })
			 .catch(err => {
			 	console.log(err);
			 })
	}

	return (
		<div className="detail">
		<Container>
			<Row>
			<Col xs={{ size: 6, offset: 3 }}>
				<Card>
					<CardBody>
						<CardTitle>{obj.name}</CardTitle>
						<CardText>{obj.bio}</CardText>
					</CardBody>
				</Card>
			</Col>
			</Row>
			<Row>
				<Col xs={{ size: 6, offset: 3 }}>
				<Form>
					<Label className="text-light" for="Name">Name</Label>
        			<Input size="md" type="text" name="name" placeholder="name" value={newObj.name} onChange={handleChanges} />
				
					<Label className="text-light" for="Bio">Bio</Label>
        			<Input size="md" type="text" name="bio" placeholder="bio" value={newObj.bio} onChange={handleChanges} />
				</Form>
				</Col>
			</Row>
			<Row>
				<Col>
				<Button onClick={submitPut} color="primary">PUT</Button>
				</Col>
			</Row>
			<img className="sauron" src={sauron} alt="sauron" width="300" height="200"/>
		</Container>
		</div>
	);
}