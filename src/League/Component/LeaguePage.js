import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Divider, Segment, Label, Container, Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

import Navbar from "../../Navbar/Component/Navbar";
import Profile from "../../Profile/Component/Profile";
import PlayerTeam from "../../PlayerTeam/Component/PlayerTeam";

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
			LeaguePage.renderNoTeams();
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
						{props.playerTeamFromLeague.map(team => <PlayerTeam key={team.team_id} team={team} cardColor={'green'}/>)}
						{LeaguePage.renderAddTeam()}
					</Card.Group>
				</div>
			</Segment>
		);
	}

	static renderNoTeams() {
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
						{LeaguePage.renderAddTeam()}
					</Card.Group>
				</div>
			</Segment>
		);
	}

	static renderAddTeam() {
		return (
			<Card color={'purple'}>
				<Card.Content>
					<Card.Header textAlign='center'>
						{"Add a Team"}
					</Card.Header>
					<Card.Description className={`${className}__Add`}>
						<Icon name={'plus'}  />
					</Card.Description>
				</Card.Content>
			</Card>
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
