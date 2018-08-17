import React, { Component } from 'react';
import { connect } from 'react-redux';

import getLeagueAction from "../Action/getLeagueAction";

import leagueSelector from "../Selector/leagueSelector";
import playerTeamFromLeagueSelector from "../../PlayerTeam/Selector/playerTeamFromLeagueSelector";

export default function(DecoratedComponent) {
	@connect(
		state => ({
			league: leagueSelector(state),
			playerTeamFromLeague: playerTeamFromLeagueSelector(state),
		}),
		dispatch => ({
			getLeague: (leagueId) => dispatch(getLeagueAction(leagueId)),
		})
	)
	class LeaguePageDecorator extends Component {
		componentDidMount() {
			const props = this.props;
			const leagueId = (props.match.params && props.match.params.league_id) || null;
			if(leagueId) {
				props.getLeague(leagueId);
			}
		}
		render() {
			return (
				<DecoratedComponent
					{...this.props}
				/>
			)
		}
	}

	return LeaguePageDecorator;
}

