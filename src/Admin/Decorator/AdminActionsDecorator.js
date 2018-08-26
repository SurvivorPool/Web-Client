import React, { Component } from 'react';
import { connect } from 'react-redux';

import populateGamesAction from "../Action/populateGamesAction";
import populateTeamsAction from "../Action/populateTeamsAction";
import populateStadiumsAction from "../Action/populateStadiumsAction";

export default function(DecoratedComponent) {
	@connect(
		state => ({
		}),
		dispatch => ({
			populateGames: () => dispatch(populateGamesAction()),
			populateTeams: () => dispatch(populateTeamsAction()),
			populateStadiums: () => dispatch(populateStadiumsAction()),
		}),
	)
	class AdminActionsDecorator extends Component {
		render() {
			return (
				<DecoratedComponent
					{...this.props}
				/>
			)
		}
	}

	return AdminActionsDecorator;
}

