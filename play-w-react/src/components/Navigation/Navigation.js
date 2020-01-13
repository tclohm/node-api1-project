import React, { useState } from "react";
import { Route, NavLink as RouteLink } from "react-router-dom";
import { Home } from "../Home";
import { Crud, CrudDetail } from "../Crud";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'reactstrap';

export const Navigation = (props) => {

	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color="clear" dark expand="sm">
				<Container fluid={true}>
					<NavbarBrand>
						<RouteLink className="text-light" to="/">
							<i className="fas fa-ring"></i>
						</RouteLink>
					</NavbarBrand>
					<NavbarToggler className="text-light" onClick={toggle} />
					<Collapse isOpen={isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<RouteLink className="text-light" to="/crud">
									<i className="fas fa-users"></i>
								</RouteLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
			<Route exact path="/" component={Home} />
			<Route exact path="/crud" component={Crud} />
			<Route path="/crud/:id" {...props} render={props => {return <CrudDetail {...props} /> }} />
		</div>
	);
};