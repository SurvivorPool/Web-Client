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
		if(!this.props.leagues && this.props.leagues.leagues) {
			this.props.getAllLeagues();
		}
	}

	static renderLeagueCards(props) {
		const leagueCards = (props.leagues && props.leagues.leagues) || [];
		return leagueCards.length ? <LeagueCards leagues={leagueCards}/> : null;
	}

	render() {
		return (
			<div className={className}>
				<Navbar>
					<Profile
						onLogoutClick={this.props.logout}
						redirectLink={"/admin"}
						redirectLabel={"Admin Dashboard"}
					/>
				</Navbar>
				<div className={`${className}__Content`}>
					{Dashboard.renderLeagueCards(this.props)}
				</div>
			</div>
		);
	}
}

export default Dashboard;
