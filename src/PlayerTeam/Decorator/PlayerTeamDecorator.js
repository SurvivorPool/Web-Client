import React, { Component } from 'react';
import { connect } from 'react-redux';

import createPlayerTeamAction from "../Action/createPlayerTeamAction";
import getPlayerTeamAction from "../Action/getPlayerTeamAction";
import updatePlayerTeamAction from "../Action/updatePlayerTeamAction";
import deletePlayerTeamAction from "../Action/deletePlayerTeamAction";

import playerTeamSelector from "../Selector/playerTeamSelector";

export default function(DecoratedComponent) {
	@connect(
		state => ({
			playerTeam: playerTeamSelector(state),
		}),
		dispatch => ({
			getPlayerTeam: (teamId) => dispatch(getPlayerTeamAction(teamId)),
			createPlayerTeam: (team) => dispatch(createPlayerTeamAction(team)),
			updatePlayerTeam: (team) => dispatch(updatePlayerTeamAction(team)),
			deletePlayerTeam: (team) => dispatch(deletePlayerTeamAction(team)),
		})
	)
	class PlayerTeamDecorator extends Component {

		render() {
			return (
				<DecoratedComponent
					{...this.props}
				/>
			)
		}
	}

	return PlayerTeamDecorator;
}

