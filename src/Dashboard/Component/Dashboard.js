import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Link } from "react-router-dom";

import Navbar from "../../Navbar/Component/Navbar";
import PrimaryButton from "../../Common/PrimaryButton/PrimaryButton";

import AuthDecorator from "../../Common/Auth/Component/AuthDecorator";

const className = "Dashboard";

@AuthDecorator
class Dashboard extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	onLogoutClick() {
		this.props.logout();
	}

	render() {
		return (
			<div className={className}>
				<Navbar>
					<PrimaryButton onClick={this.onLogoutClick}>
						{"Sign Out"}
					</PrimaryButton>
				</Navbar>
			</div>
		);
	}
}

export default Dashboard;
