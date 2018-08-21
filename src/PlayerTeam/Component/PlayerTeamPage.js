import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Divider, Segment, Label, Container, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

import Navbar from "../../Navbar/Component/Navbar";
import Profile from "../../Profile/Component/Profile";

import AuthDecorator from "../../Common/Auth/Component/AuthDecorator";
import UserDecorator from "../../Common/Auth/Component/UserDecorator";
import LoaderDecorator from "../../Common/Loader/Component/LoaderDecorator";
import PlayerTeamDecorator from "../Decorator/PlayerTeamDecorator";
import PlayerTeamPageDecorator from "../Decorator/PlayerTeamPageDecorator";

const className = "PlayerTeamPage";

@AuthDecorator
@UserDecorator
@PlayerTeamDecorator
@PlayerTeamPageDecorator
@LoaderDecorator
class PlayerTeamPage extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	static renderTitle(props) {
		return (
			<div className={`${className}__Header__Container`}>
				<h1 className={`${className}__Header`}>
					{props.playerTeam.data && props.playerTeam.data.team_name}
				</h1>
			</div>
		);
	}

	static renderNavBar(props) {
		const leagueLink = props.league.data && props.league.data.league_id ? (
			<Link
				to={`/league/${props.league.data.league_id}`}
				className={'Navbar__Link'}
			>
				{"League"}
			</Link>
		) : null;

		return (
			<Navbar>
				<Link
					to={'/dashboard'}
					className={'Navbar__Link'}
				>
					{"Dashboard"}
				</Link>
				{leagueLink}
				<Profile
					currentPage={'/league'}
				/>
			</Navbar>
		);
	}

	render() {
		const props = this.props;

		return (
			<div className={className}>
				{PlayerTeamPage.renderNavBar(props)}
				<div className={`${className}__Content`}>
					<Container>
						{PlayerTeamPage.renderTitle(props)}
					</Container>
				</div>
			</div>
		);
	}
}

export default PlayerTeamPage;
