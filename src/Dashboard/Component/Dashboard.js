import React, { Component } from 'react';
import autoBind from 'react-autobind';

import Navbar from "../../Navbar/Component/Navbar";
import Profile from "../../Profile/Component/Profile";
import LeagueCards from "../../League/Component/LeagueCards";

import AuthDecorator from "../../Common/Auth/Component/AuthDecorator";
import LoaderDecorator from "../../Common/Loader/Component/LoaderDecorator";
import UserDecorator from "../../Common/Auth/Component/UserDecorator";
import LeagueDecorator from "../../League/Decorator/LeagueDecorator";

const className = "Dashboard";

@AuthDecorator
@UserDecorator
@LeagueDecorator
@LoaderDecorator
class Dashboard extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	componentDidMount() {
		//testing code
		if(!Object.keys(this.props.league).length) {
			this.props.getLeague(1);
		}
	}

	onLogoutClick() {
		this.props.logout();
	}

	static renderLeagueCards(props) {
		return Object.keys(props.league).length ? <LeagueCards leagues={[{...props.league}]}/> : null;
	}

	render() {
		return (
			<div className={className}>
				<Navbar>
					<Profile onLogoutClick={this.onLogoutClick}/>
				</Navbar>
				<div className={`${className}__Content`}>
					{Dashboard.renderLeagueCards(this.props)}
				</div>
			</div>
		);
	}
}

export default Dashboard;
