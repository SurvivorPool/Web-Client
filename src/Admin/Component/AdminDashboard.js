import React, { Component } from 'react';
import autoBind from 'react-autobind';

import Navbar from "../../Navbar/Component/Navbar";
import Profile from "../../Profile/Component/Profile";
import LeagueAdmin from "./League/LeagueAdmin";

import AdminDecorator from "../Decorator/AdminDecorator";

const className = "AdminDashboard";

@AdminDecorator
class AdminDashboard extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
		}
	}


	render() {
		return (
			<div className={className}>
				<Navbar>
					<Profile
						onLogoutClick={this.props.logout}
						redirectLink={"/dashboard"}
						redirectLabel={"Dashboard"}
					/>
				</Navbar>
				<div className={`${className}__Content`}>
					<LeagueAdmin/>
				</div>
			</div>
		);
	}
}

export default AdminDashboard;
