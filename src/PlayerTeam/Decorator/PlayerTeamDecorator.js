import React, { Component } from 'react';
import { connect } from 'react-redux';

import createPlayerTeamAction from "../Action/createPlayerTeamAction";
import getPlayerTeamAction from "../Action/getPlayerTeamAction";
import updatePlayerTeamAction from "../Action/updatePlayerTeamAction";
import deletePlayerTeamAction from "../Action/deletePlayerTeamAction";

/* Admin */
import adminGetAllPlayerTeamAction from "../Action/adminGetAllPlayerTeamAction";
import adminUpdatePlayerTeamAction from "../Action/adminUpdatePlayerTeamAction";
import adminDeletePlayerTeamAction from "../Action/adminDeletePlayerTeamAction";
import adminClearPlayerTeamAction from "../Action/adminClearPlayerTeamAction";

import playerTeamSelector from "../Selector/playerTeamSelector";
import playerTeamsSelector from "../Selector/playerTeamsSelector";

export default function(DecoratedComponent) {
	@connect(
		state => ({
			playerTeam: playerTeamSelector(state),
			playerTeams: playerTeamsSelector(state),
		}),
		dispatch => ({
			getPlayerTeam: teamId => dispatch(getPlayerTeamAction(teamId)),
			createPlayerTeam: team => dispatch(createPlayerTeamAction(team)),
			updatePlayerTeam: team => dispatch(updatePlayerTeamAction(team)),
			deletePlayerTeam: team => dispatch(deletePlayerTeamAction(team)),
			adminGetAllPlayerTeams: () => dispatch(adminGetAllPlayerTeamAction()),
			adminUpdatePlayerTeam: team => dispatch(adminUpdatePlayerTeamAction(team)),
			adminDeletePlayerTeam: team => dispatch(adminDeletePlayerTeamAction(team)),
			adminClearPlayerTeam: () => dispatch(adminClearPlayerTeamAction()),
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

