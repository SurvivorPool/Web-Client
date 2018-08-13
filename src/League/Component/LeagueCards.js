import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { Card, Checkbox, Container } from 'semantic-ui-react';

const className = "LeagueCards";

class LeagueCards extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
			showAllLeagues: true,
		};
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

	static renderLeagueCards(props, showAllLeagues) {
		const leagues = showAllLeagues ? props.leagues : props.playerLeagues;
		return leagues.length ? leagues.map(league => {
			return (
				<Card
					key={league.league_id}
					header={league.league_name}
					meta='League'
					description={league.league_description}
					extra='Your teams'
				/>
			);
		}) : LeagueCards.renderNoLeagues();
	}

	static renderCurrentLeagues(props, showAllLeagues) {
		return showAllLeagues ? (
			<Card.Group>
				{LeagueCards.renderLeagueCards(props, showAllLeagues)}
			</Card.Group>
		) : null;
	}

	static renderPlayerLeagues(props, showAllLeagues) {
		return !showAllLeagues ? (
			<Card.Group>
				{LeagueCards.renderLeagueCards(props, showAllLeagues)}
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
		const { showAllLeagues } = this.state;
		return (
			<Container>
				{this.renderTitle(showAllLeagues)}
				{LeagueCards.renderCurrentLeagues(props, showAllLeagues)}
				{LeagueCards.renderPlayerLeagues(props, showAllLeagues)}
			</Container>
		);
	}
}
LeagueCards.propTypes = {
	leagues: PropTypes.array,
	playerLeagues: PropTypes.array,
};

export default LeagueCards;
