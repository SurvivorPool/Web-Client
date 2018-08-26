import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Segment, Container, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { withToastManager } from "react-toast-notifications";

import Navbar from "../../Navbar/Component/Navbar";
import Profile from "../../Profile/Component/Profile";
import Game from "../../Games/Component/Game";

import AuthDecorator from "../../Common/Auth/Component/AuthDecorator";
import UserDecorator from "../../Common/Auth/Component/UserDecorator";
import LoaderDecorator from "../../Common/Loader/Component/LoaderDecorator";
import PicksDecorator from "../../Picks/Decorator/PicksDecorator";
import PlayerTeamDecorator from "../Decorator/PlayerTeamDecorator";
import PlayerTeamPageDecorator from "../Decorator/PlayerTeamPageDecorator";


const className = "PlayerTeamPage";

@withToastManager
@AuthDecorator
@UserDecorator
@PlayerTeamDecorator
@PlayerTeamPageDecorator
@PicksDecorator
@LoaderDecorator
class PlayerTeamPage extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	componentDidMount() {
		const props = this.props;

		if(!props.games.data || !props.games.data.games) {
			props.getGames();
		}
	}

	componentWillUnMount() {
		this.props.clearPick();
	}

	onPickSuccess(pick) {
		const { toastManager } = this.props;
		toastManager.add(`Picked the ${pick.nfl_team_name}!`, { appearance: 'success', autoDismiss: true });
		this.props.getPlayerTeam(pick.team_id);
	}

	onPickFailure() {
		const { toastManager } = this.props;
		toastManager.add('Oh no, something terrible happened!', { appearance: 'error' });
	}

	handlePick(pick) {
		if(pick) {
			this.props.createPick(pick)
				.then(() => this.onPickSuccess(pick))
				.catch(this.onPickFailure);
		}
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
		const leagueInfo = props.playerTeam.data && props.playerTeam.data.league_info;
		const leagueLink = leagueInfo && leagueInfo.league_id ? (
			<Link
				to={`/league/${leagueInfo.league_id}`}
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

	static renderPickSection(props) {
		const { pickedGame } = props;

		return (
			<Segment
				raised
			>
				{PlayerTeamPage.getCurrentPick(pickedGame.playerPick)}
			</Segment>
		);
	}

	static getCurrentPick(currentPick) {
		return currentPick ? (
			<div className={`${className}__Pick`}>
				<h2>{`You've currently chosen the ${currentPick}.`}</h2>
				<span>{`If the ${currentPick}' game hasn't started yet, you can switch to another team. Goodluck!`}</span>
			</div>
		) : (
			<div className={`${className}__Pick`}>
				{"No current pick. Choose a team below!"}
			</div>
		);
	}

	renderGames(props) {
		const games = (props.games.data && props.games.data.games) || [];
		const playerTeam = (props.playerTeam.data || {});

		return games.length ? (
			<Segment
				raised
			>
				<Label
					ribbon
					color={'blue'}
				>
					{"Upcoming Games"}
				</Label>
				{games.map(game =>
					<Game
						key={game.game_id}
						game={game}
						playerTeam={playerTeam}
						pickedGame={props.pickedGame}
						handlePick={this.handlePick}
					/>
				)}
			</Segment>
		) : null;
	}

	render() {
		const props = this.props;

		return (
			<div className={className}>
				{PlayerTeamPage.renderNavBar(props)}
				<div className={`${className}__Content`}>
					<Container>
						{PlayerTeamPage.renderTitle(props)}
						{PlayerTeamPage.renderPickSection(props)}
						{this.renderGames(props)}
					</Container>
				</div>
			</div>
		);
	}
}

export default PlayerTeamPage;
