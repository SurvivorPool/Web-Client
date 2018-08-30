import React, { Component } from 'react';
import autoBind from 'react-autobind';
import {Segment, Container, Label, Card, Checkbox} from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { withToastManager } from "react-toast-notifications";

import Navbar from "../../Navbar/Component/Navbar";
import Profile from "../../Profile/Component/Profile";
import Game from "../../Games/Component/Game";
import Footer from "../../Common/Footer/Footer";

import AuthDecorator from "../../Common/Auth/Decorator/AuthDecorator";
import UserDecorator from "../../Common/Auth/Decorator/UserDecorator";
import LoaderDecorator from "../../Common/Loader/Component/LoaderDecorator";
import PicksDecorator from "../../Picks/Decorator/PicksDecorator";
import PlayerTeamDecorator from "../Decorator/PlayerTeamDecorator";
import PlayerTeamPageDecorator from "../Decorator/PlayerTeamPageDecorator";

import { getLogoPath } from "../../Games/Util/teamConfig";

const className = "PlayerTeamPage";
const pickClassName = "PlayerTeamPage__Pick";

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
		this.state = {
			shouldShowHistory: false,
		};
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

	handleHistoryToggle() {
		this.setState((prevState) => {
			return {
				shouldShowHistory: !prevState.shouldShowHistory,
			};
		});
	}

	onPickSuccess(pick) {
		const { toastManager } = this.props;
		toastManager.add(`Picked the ${pick.nfl_team_name}!`, { appearance: 'success', autoDismiss: true });
		this.props.loadUser().then(() => this.props.getPlayerTeam(pick.team_id));
	}

	onPickFailure() {
		const { toastManager } = this.props;
		toastManager.add('Oh no, something terrible happened!', { appearance: 'error' });
		this.props.loadUser();
	}

	handlePick(pick) {
		if(pick) {
			this.props.createPick(pick)
				.then(() => this.onPickSuccess(pick))
				.catch(this.onPickFailure);
		}
	}

	static renderTitle(props, shouldShowHistory, handleHistoryToggle) {
		return (
			<div className={`${className}__Header__Container`}>
				<h1 className={`${className}__Header`}>
					{props.playerTeam.data && props.playerTeam.data.team_name}
				</h1>
				{PlayerTeamPage.renderHistoryToggle(shouldShowHistory, handleHistoryToggle)}
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

	static renderPickHistorySection(props, shouldShowHistory) {
		const { playerTeam } = props;
		const pickHistory = (playerTeam.data && playerTeam.data.pick_history) || [];

		return shouldShowHistory && pickHistory.length ? (
			<Segment
				raised
			>
				<Label
					ribbon
					color={'orange'}
				>
					{"Previous Picks"}
				</Label>
				<div
					className={`${pickClassName}__History`}
				>
					<Card.Group
						centered
					>
						{pickHistory.sort((a, b) => a.week_num - b.week_num).map(pick => PlayerTeamPage.renderHistoricPick(pick))}
					</Card.Group>
				</div>
			</Segment>
		) : null;
	}

	static renderHistoricPick(pick) {
		const teamName = pick.nfl_team_name === '49ers' ? 'niners' : pick.nfl_team_name.toLowerCase();
		const logoPath = getLogoPath(teamName);

		return (
			<Card
				key={pick.pick_id}
				className={`${pickClassName}__Card`}
			>
				<Card.Content>
					<Card.Header>
						{`Week ${pick.week_num}`}
					</Card.Header>
					<Card.Meta>
						{"Pick"}
					</Card.Meta>
					<Card.Description>
						<div className={`${pickClassName}__Container`}>
							<img
								src={logoPath}
								alt={`${pick.nfl_team_name} logo`}
								className={`${pickClassName}__Logo`}
							/>
							{pick.nfl_team_name}
						</div>
					</Card.Description>
				</Card.Content>
			</Card>


		);
	}

	static getCurrentPick(currentPick) {
		return currentPick ? (
			<div className={pickClassName}>
				<h2>{`You've currently chosen the ${currentPick}.`}</h2>
				<span>{`If the ${currentPick}' game hasn't started yet, you can switch to another team. Goodluck!`}</span>
			</div>
		) : (
			<div className={pickClassName}>
				<h2>{"No current pick."}</h2>
				<h4>{"Choose a team below!"}</h4>
			</div>
		);
	}

	renderGames(props) {
		const games = (props.games.data && props.games.data.games) || [];
		const playerTeam = (props.playerTeam.data || {});
		const pickHistory = playerTeam && playerTeam.pick_history && playerTeam.pick_history.map(pick => pick.nfl_team_name);

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
						pickHistory={pickHistory}
						handlePick={this.handlePick}
					/>
				)}
			</Segment>
		) : null;
	}

	static renderHistoryToggle(shouldShowHistory, handleHistoryToggle) {
		const label = shouldShowHistory ? "Hide History" : "Show History";
		return (
			<Checkbox
				className={`${pickClassName}__Toggle`}
				slider
				onChange={handleHistoryToggle}
				checked={shouldShowHistory}
				label={label}
			/>
		);
	}

	render() {
		const props = this.props;
		const { shouldShowHistory } = this.state;

		return (
			<React.Fragment>
				{PlayerTeamPage.renderNavBar(props)}
				<div className={className}>
					<div className={`${className}__Content`}>
						<Container>
							{PlayerTeamPage.renderTitle(props, shouldShowHistory, this.handleHistoryToggle)}
							{PlayerTeamPage.renderPickSection(props)}
							{PlayerTeamPage.renderPickHistorySection(props, shouldShowHistory)}
							{this.renderGames(props)}
						</Container>
					</div>
					<Footer />
				</div>
			</React.Fragment>
		);
	}
}

export default PlayerTeamPage;
