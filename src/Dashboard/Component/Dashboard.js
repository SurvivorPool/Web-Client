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
		if(!this.props.user.data) {
			this.props.getUser({user_id: this.props.auth.data.uid});
		} else if (!this.props.leagues.data) {
			this.props.getAllLeagues();
		} else if (!this.props.playerLeagues.data) {
			this.props.getLeagueByUser(this.props.user.data);
		}
	}

	static renderLeagueCards(props) {
		const leagues = (props.leagues.data && props.leagues.data.leagues) || [];
		const playerLeagues = (props.playerLeagues.data && props.playerLeagues.data.user_leagues) || [];
		return (
			<LeagueCards
				leagues={leagues}
				playerLeagues={playerLeagues}
			/>
		);
	}

	render() {
		return (
			<div className={className}>
				<Navbar>
					<Profile
						currentPage={'/dashboard'}
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
