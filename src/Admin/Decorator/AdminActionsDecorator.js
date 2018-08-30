import React, { Component } from 'react';
import { connect } from 'react-redux';

import populateGamesAction from "../Action/populateGamesAction";
import populateTeamsAction from "../Action/populateTeamsAction";
import populateStadiumsAction from "../Action/populateStadiumsAction";
import advanceWeekAction from "../Action/advanceWeekAction";

import adminUpdatePlayerTeamAction from "../../PlayerTeam/Action/adminUpdatePlayerTeamAction";
import adminDeletePlayerTeamAction from "../../PlayerTeam/Action/adminDeletePlayerTeamAction";

export default function(DecoratedComponent) {
	@connect(
		null,
		dispatch => ({
			populateGames: () => dispatch(populateGamesAction()),
			populateTeams: () => dispatch(populateTeamsAction()),
			populateStadiums: () => dispatch(populateStadiumsAction()),
			advanceWeek: () => dispatch(advanceWeekAction()),
			updatePlayerTeam: team => dispatch(adminUpdatePlayerTeamAction(team)),
			deletePlayerTeam: team => dispatch(adminDeletePlayerTeamAction(team)),
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

