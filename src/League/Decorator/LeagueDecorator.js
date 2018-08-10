import React, { Component } from 'react';
import { connect } from 'react-redux';

import getLeagueAction from "../Action/getLeagueAction";
import getLeagueByUserAction from "../Action/getLeagueByUserAction";
import createLeagueAction from "../Action/createLeagueAction";
import updateLeagueAction from "../Action/updateLeagueAction";

import leagueSelector from "../Selector/leagueSelector";

export default function(DecoratedComponent) {
	@connect(
		state => ({
			league: leagueSelector(state),
		}),
		dispatch => ({
			getLeague: (leagueId) => dispatch(getLeagueAction(leagueId)),
			getLeagueByUser: (user) => dispatch(getLeagueByUserAction(user)),
			createLeague: (league) => dispatch(createLeagueAction(league)),
			updateLeague: (league) => dispatch(updateLeagueAction(league)),
		})
	)
	class LeagueDecorator extends Component {
		render() {
			return (
				<DecoratedComponent
					{...this.props}
				/>
			)
		}
	}

	return LeagueDecorator;
}

