import React, { useEffect, useState } from "react";
import sauron from "./assets/sauron.gif"
import axios from "axios";
import { Container, Row, Col, Button } from "reactstrap";

import "../../App.css";

export const CrudDetail = (props) => {

	const id = props.match.params.id;
	const [obj, setObj] = useState({name: "", bio: ""});

	useEffect(() => {
		
		axios.get(`http://www.localhost:4000/api/users/${id}`)
			 .then(res => {
				setObj({name: res.data.person.name, bio: res.data.person.bio})
			})
			 .catch(err => {
				console.log(err)
			})
	}, [obj, id])

	// const handleChanges = (event) => {
	// 	if(event.target.name === "name") {
	// 		setNewObj({...newObj, [event.target.name]: event.target.value})
	// 	}
	// 	if(event.target.name === "bio") {
	// 		setNewObj({...newObj, [event.target.name]: event.target.value})
	// 	}
	// }

	// const submitPut = (event) => {
	// 	event.preventDefault();
	// 	axios.put(`http://www.localhost:4000/api/users/${id}`, newObj)
	// 		 .then(res => {
	// 		 	props.history.push("/crud")
	// 		 })
	// 		 .catch(err => {
	// 		 	console.log(err);
	// 		 })
	// }

	return (
		<div className="detail">
		<Container>
			<Row>
			<Col xs={{ size: 11, offset: 1 }}>
				<h1>{obj.name}</h1>
				<h1>{obj.bio}</h1>
			</Col>
			</Row>
			<img className="sauron" src={sauron} alt="sauron" width="300" height="200"/>
		</Container>
		</div>
	);
}