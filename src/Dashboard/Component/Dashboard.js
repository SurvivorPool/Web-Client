import React, { Component } from 'react';
import autoBind from 'react-autobind';

import Navbar from "../../Navbar/Component/Navbar";
import Profile from "../../Profile/Component/Profile";
import LeagueCards from "../../League/Component/LeagueCards";
import Footer from "../../Common/Footer/Footer";

import DashboardDecorator from "../Decorator/DashboardDecorator";

const className = "Dashboard";

@DashboardDecorator
class Dashboard extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
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
			<React.Fragment>
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
				<Footer />
			</React.Fragment>
		);
	}
}

export default Dashboard;
