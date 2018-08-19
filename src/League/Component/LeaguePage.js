import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Divider, Segment, Label, Container, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

import Navbar from "../../Navbar/Component/Navbar";
import Profile from "../../Profile/Component/Profile";
import PlayerTeam from "../../PlayerTeam/Component/PlayerTeam";
import PlayerTeamAdd from "../../PlayerTeam/Component/PlayerTeamAdd";

import AuthDecorator from "../../Common/Auth/Component/AuthDecorator";
import UserDecorator from "../../Common/Auth/Component/UserDecorator";
import LoaderDecorator from "../../Common/Loader/Component/LoaderDecorator";
import LeaguePageDecorator from "../Decorator/LeaguePageDecorator";

const className = "LeaguePage";

@AuthDecorator
@UserDecorator
@LeaguePageDecorator
@LoaderDecorator
class LeaguePage extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	static renderLeagueTitle(props) {
		return (
			<div className={`${className}__Header__Container`}>
				<h1 className={`${className}__Header`}>
					{props.league.data.league_name}
				</h1>
			</div>
		);
	}

	static renderLeagueInfo(props) {
		return (
			<div className={`${className}__Info__Container`}>
				<Segment raised>
					<Label
						color='orange'
						ribbon
						className={`${className}__Info__Ribbon`}
					>
						{'Description'}
					</Label>
					<div className={`${className}__Info`}>
						{props.league.data.league_description}
					</div>
				</Segment>
			</div>
		);
	}

	static renderLeague(props) {
		return props.league.data && props.league.data.league_name ? (
			<React.Fragment>
				{LeaguePage.renderLeagueTitle(props)}
				<Divider />
				{LeaguePage.renderLeagueInfo(props)}
				{LeaguePage.renderPlayerTeams(props)}
			</React.Fragment>
		) :  null;
	}

	static renderPlayerTeams(props) {
		if(!props.playerTeamFromLeague.length) {
			LeaguePage.renderNoTeams(props);
		}

		return (
			<Segment raised>
				<Label
					color='olive'
					ribbon
					className={`${className}__Info__Ribbon`}
				>
					{'Your Teams'}
				</Label>
				<div className={`${className}__Teams__Container`}>
					<Card.Group>
						{props.playerTeamFromLeague.map(team =>
							<PlayerTeam
								key={team.team_id}
								team={team}
								cardColor={'green'}
								loadLeague={props.loadLeague}
							/>
						)}
						{LeaguePage.renderAddTeam(props)}
					</Card.Group>
				</div>
			</Segment>
		);
	}

	static renderNoTeams(props) {
		return (
			<Segment raised>
				<Label
					color='olive'
					ribbon
					className={`${className}__Info__Ribbon`}
				>
					{'Your Teams'}
				</Label>
				<div className={`${className}__Teams__Container`}>
					<Card.Group>
						{LeaguePage.renderAddTeam(props)}
					</Card.Group>
				</div>
			</Segment>
		);
	}

	static renderAddTeam(props) {
		return (
			<PlayerTeamAdd
				userId={props.user.data.user_id}
				leagueId={props.league.data.league_id}
				loadLeague={props.loadLeague}
			/>
		);
	}

	render() {
		const props = this.props;
		return (
			<div className={className}>
				<Navbar>
					<Link
						to={'/dashboard'}
						className={'Navbar__Link'}
					>
						{"Dashboard"}
					</Link>
					<Profile
						currentPage={'/league'}
					/>
				</Navbar>
				<div className={`${className}__Content`}>
					<Container>
						{LeaguePage.renderLeague(props)}
					</Container>
				</div>
			</div>
		);
	}
}

export default LeaguePage;
