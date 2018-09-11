import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Link } from 'react-router-dom'
import { Label } from 'semantic-ui-react';

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

	static renderUnreadCount(props) {
		return props.unreadMessages > 0 ? (
			<span className={`${className}__Messages`}>
				<Label
					color={'orange'}
					circular
				>
					{props.unreadMessages}
				</Label>
			</span>
		) : null;
	}

	render() {
		return (
			<React.Fragment>
				<div className={className}>
					<Navbar>
						<Link
							to={'/messages'}
							className={'Navbar__Link'}
						>
							{"Messages"}
							{Dashboard.renderUnreadCount(this.props)}
						</Link>
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
