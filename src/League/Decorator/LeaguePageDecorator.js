import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';

import getLeagueAction from "../Action/getLeagueAction";
import getLeagueStatsAction from "../../Stats/Action/getLeagueStatsAction";

import leagueSelector from "../Selector/leagueSelector";
import playerTeamFromLeagueSelector from "../../PlayerTeam/Selector/playerTeamFromLeagueSelector";
import leaguePlayersSelector from "../Selector/leaguePlayersSelector";
import canCreateTeamSelector from "../Selector/canCreateTeamSelector";
import leagueStatsSelector from "../../Stats/Selector/leagueStatsSelector";

export default function(DecoratedComponent) {
	@connect(
		state => ({
			canCreateTeam: canCreateTeamSelector(state),
			league: leagueSelector(state),
			leaguePlayers: leaguePlayersSelector(state),
			leagueStats: leagueStatsSelector(state),
			playerTeamFromLeague: playerTeamFromLeagueSelector(state),
		}),
		dispatch => ({
			getLeague: (leagueId) => dispatch(getLeagueAction(leagueId)),
			getLeagueStats: (leagueId) => dispatch(getLeagueStatsAction(leagueId)),
		})
	)
	class LeaguePageDecorator extends Component {
		constructor(props) {
			super(props);
			autoBind(this);
		}

		componentDidMount() {
			this.loadLeague();
			this.loadLeagueStats();
		}

		loadLeague() {
			const props = this.props;
			const leagueId = (props.match.params && props.match.params.id) || null;
			if(leagueId) {
				this.props.getLeague(leagueId)
			}
		}

		loadLeagueStats() {
			const props = this.props;
			const leagueId = (props.match.params && props.match.params.id) || null;
			if(leagueId) {
				this.props.getLeagueStats(leagueId);
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

