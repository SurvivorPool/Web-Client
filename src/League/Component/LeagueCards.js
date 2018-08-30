import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { Redirect} from 'react-router-dom';
import { Card, Checkbox, Container, Label, Icon } from 'semantic-ui-react';

import UserDecorator from "../../Common/Auth/Decorator/UserDecorator";

const className = "LeagueCards";

@UserDecorator
class LeagueCards extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
			selectedLeagueId: null,
			showAllLeagues: true,
			shouldRedirect: false,
		};
	}

	handleLeagueSelection(selectedLeagueId) {
		this.setState({
			selectedLeagueId,
			shouldRedirect: true,
		});
	}

	handleLeagueToggle() {
		this.setState({
			showAllLeagues: !this.state.showAllLeagues,
		});
	}

	renderTitle(showAllLeagues) {
		const title = showAllLeagues ? "Current Leagues" : "Your Leagues";
		return (
			<div className={`${className}__Header__Container`}>
				<h1 className={`${className}__Header`}>
					{title}
				</h1>
				{this.renderLeagueToggle(showAllLeagues)}
			</div>
		)
	}

	static renderLeagueCards(props, showAllLeagues, handleLeagueSelection) {
		const leagues = showAllLeagues ? props.leagues : props.playerLeagues;
		return leagues.length ? leagues.map(league => {
			return (
				<Card
					key={league.league_id}
					onClick={() => handleLeagueSelection(league.league_id)}
				>
					<Card.Content>
						<Card.Header>
							{league.league_name}
						</Card.Header>
						<Card.Description>
							{league.league_description}
						</Card.Description>
						{LeagueCards.renderLeagueMeta(league)}
					</Card.Content>
					{LeagueCards.renderLeagueExtra(league, props)}
				</Card>
			);
		}) : LeagueCards.renderNoLeagues();
	}

	static renderLeagueMeta(league) {
		const isLeagueActive = !!league.is_active;
		const isFree = league.league_type === 'FREE';
		const price = isFree ? 'Free' : `$${league.price}`;

		return (
			<Card.Description className={`${className}__Meta`}>
				<Label
					color={isLeagueActive ? 'green' : 'red'}
					size={'small'}
				>
					{isLeagueActive ? 'Open' : 'Closed'}
				</Label>
				<Label
					color={'orange'}
					size={'small'}
				>
					<Icon name={'ticket'} />
					<Label.Detail>{price}</Label.Detail>
				</Label>
				{!isFree ? (
					<Label
						color={'blue'}
						size={'small'}
					>
						<Icon name={'trophy'} />
						<Label.Detail>{`$${league.pot}`}</Label.Detail>
					</Label>
				) : null}
			</Card.Description>
		)
	}

	static renderCurrentLeagues(props, showAllLeagues, handleLeagueSelection) {
		return showAllLeagues ? (
			<Card.Group>
				{LeagueCards.renderLeagueCards(props, showAllLeagues, handleLeagueSelection)}
			</Card.Group>
		) : null;
	}

	static renderPlayerLeagues(props, showAllLeagues, handleLeagueSelection) {
		return !showAllLeagues ? (
			<Card.Group>
				{LeagueCards.renderLeagueCards(props, showAllLeagues, handleLeagueSelection)}
			</Card.Group>
		) : null;
	}

	static renderLeagueExtra(league, props) {
		return (
			<Card.Content
				extra
			>
				{LeagueCards.renderPlayerTeamCount(league, props)}
			</Card.Content>
		)
	}

	static renderPlayerTeamCount(league, props) {
		const playerTeams = (props.user.data && props.user.data.teams) || [];
		const noTeamMessage = <div>{"Join this league!"}</div>;

		if(!playerTeams.length) {
			return noTeamMessage;
		}

		const leagueTeams = playerTeams.filter(team => team.league_id === league.league_id);
		return leagueTeams.length ? (
			<div>
				<Label
					horizontal
					color={'olive'}
				>
					{"Teams"}
				</Label>
				{LeagueCards.renderCountMessage(leagueTeams)}
			</div>
		) : noTeamMessage;
	}

	static renderCountMessage(leagueTeams) {
		const count = leagueTeams.length;
		const multipleOthers = leagueTeams.length >= 3;
		return count > 1 ?
			`${leagueTeams[0].team_name} and ${leagueTeams.length - 1} other${multipleOthers ? 's' : ''}..`
			: leagueTeams[0].team_name;
	}

	static renderNoLeagues() {
		return (
			<div className={`${className}__Empty`}>
				{"Sorry, we didn't find any leagues ☹️"}
			</div>
		)
	}

	renderLeagueToggle(showAllLeagues) {
		const label = showAllLeagues ? "All Leagues" : "Your Leagues";
		return (
			<Checkbox
				className={`${className}__Toggle`}
				slider
				onChange={this.handleLeagueToggle}
				checked={!showAllLeagues}
				label={label}
			/>
		);
	}

	render() {
		const props = this.props;
		const { showAllLeagues, shouldRedirect, selectedLeagueId } = this.state;

		if(shouldRedirect) {
			return (
				<Redirect to={`/league/${selectedLeagueId}`}/>
			);
		}

		return (
			<Container>
				{this.renderTitle(showAllLeagues)}
				{LeagueCards.renderCurrentLeagues(props, showAllLeagues, this.handleLeagueSelection)}
				{LeagueCards.renderPlayerLeagues(props, showAllLeagues, this.handleLeagueSelection)}
			</Container>
		);
	}
}

LeagueCards.propTypes = {
	leagues: PropTypes.array,
	playerLeagues: PropTypes.array,
};

export default LeagueCards;
