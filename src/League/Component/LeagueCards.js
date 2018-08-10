import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

const className = "LeagueCards";

class LeagueCards extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	static renderLeagueCards(props) {
		return props.leagues.length ? props.leagues.map(league => {
			return (
				<Card
					key={league.league_id}
					header={league.league_name}
					meta='League'
					description={league.league_description}
					extra='Your teams'
				/>
			);
		}) : null;
	}

	render() {
		const props = this.props;
		return LeagueCards.renderLeagueCards(props);
	}
}
LeagueCards.propTypes = {
	leagues: PropTypes.array,
};

export default LeagueCards;
