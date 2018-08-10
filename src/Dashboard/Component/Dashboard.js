import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Card } from 'semantic-ui-react';

import Navbar from "../../Navbar/Component/Navbar";
import Profile from "../../Profile/Component/Profile";

import AuthDecorator from "../../Common/Auth/Component/AuthDecorator";
import LoaderDecorator from "../../Common/Loader/Component/LoaderDecorator";
import UserDecorator from "../../Common/Auth/Component/UserDecorator";

const className = "Dashboard";

@AuthDecorator
@UserDecorator
@LoaderDecorator
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
					<Profile onLogoutClick={this.onLogoutClick}/>
				</Navbar>
				<div className={`${className}__Content`}>
					<Card
						header='Sample League Card'
						meta='League'
						description='Sample League Description. How many players. Current Pot. Rules.'
						extra='Your teams'
					/>
				</div>
			</div>
		);
	}
}

export default Dashboard;
