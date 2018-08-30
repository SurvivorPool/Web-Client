import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';

import getLeagueAction from "../Action/getLeagueAction";

import leagueSelector from "../Selector/leagueSelector";
import playerTeamFromLeagueSelector from "../../PlayerTeam/Selector/playerTeamFromLeagueSelector";
import leaguePlayersSelector from "../Selector/leaguePlayersSelector";
import canCreateTeamSelector from "../Selector/canCreateTeamSelector";

export default function(DecoratedComponent) {
	@connect(
		state => ({
			league: leagueSelector(state),
			playerTeamFromLeague: playerTeamFromLeagueSelector(state),
			leaguePlayers: leaguePlayersSelector(state),
			canCreateTeam: canCreateTeamSelector(state),
		}),
		dispatch => ({
			getLeague: (leagueId) => dispatch(getLeagueAction(leagueId)),
		})
	)
	class LeaguePageDecorator extends Component {
		constructor(props) {
			super(props);
			autoBind(this);
		}

		componentDidMount() {
			this.loadLeague();
		}

		loadLeague() {
			const props = this.props;
			const leagueId = (props.match.params && props.match.params.league_id) || null;
			if(leagueId) {
				this.props.getLeague(leagueId)
			}
		}

		render() {
			return (
				<DecoratedComponent
					{...this.props}
					loadLeague={this.loadLeague}
				/>
			)
		}
	}

	return LeaguePageDecorator;
}

