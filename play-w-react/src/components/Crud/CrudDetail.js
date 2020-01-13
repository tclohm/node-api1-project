import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardTitle, CardText, CardBody, Container, Row, Col } from "reactstrap";

export const CrudDetail = (props) => {

	const id = props.match.params.id
	const [obj, setObj] = useState({name: "", bio: ""})

	useEffect(() => {
		if(obj) {
			axios.get(`http://www.localhost:4000/api/users/${id}`)
				 .then(res => {
				 	setObj({name: res.data.person.name, bio: res.data.person.bio})
				 })
				 .catch(err => {
				 	console.log(err)
				 })
		}
	}, [obj])

	return (
		<div className="align-items">
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
		</Container>
		</div>
	);
}