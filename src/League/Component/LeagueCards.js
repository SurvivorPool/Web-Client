import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Card, Checkbox, Container } from 'semantic-ui-react';

const className = "LeagueCards";

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
					header={league.league_name}
					meta='League'
					description={league.league_description}
					extra='Your teams'
					onClick={() => handleLeagueSelection(league.league_id)}
				/>
			);
		}) : LeagueCards.renderNoLeagues();
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

	static renderNoLeagues() {
		return (
			<div className={`${className}__Empty`}>
				{"Sorry, we didn't find any leagues ☹️"}
			</div>
		)
	}

	renderLeagueToggle(showAllLeagues) {
		const label = showAllLeagues ? "Your Leagues" : "All Leagues";
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
