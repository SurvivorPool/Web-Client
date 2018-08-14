import React, { Component } from 'react';
import { connect } from 'react-redux';

import getLeagueAction from "../Action/getLeagueAction";
import getLeagueByUserAction from "../Action/getLeagueByUserAction";
import createLeagueAction from "../Action/createLeagueAction";
import updateLeagueAction from "../Action/updateLeagueAction";
import getAllLeaguesAction from "../Action/getAllLeaguesAction";

import leagueSelector from "../Selector/leagueSelector";
import leaguesSelector from "../Selector/leaguesSelector";
import playerLeaguesSelector from "../Selector/playerLeaguesSelector";
import userSelector from "../../Common/Auth/Selector/userSelector";

export default function(DecoratedComponent) {
	@connect(
		state => ({
			league: leagueSelector(state),
			leagues: leaguesSelector(state),
			playerLeagues: playerLeaguesSelector(state),
			user: userSelector(state),
		}),
		dispatch => ({
			getLeague: (leagueId) => dispatch(getLeagueAction(leagueId)),
			getAllLeagues: () => dispatch(getAllLeaguesAction()),
			getLeagueByUser: (user) => dispatch(getLeagueByUserAction(user)),
			createLeague: (league) => dispatch(createLeagueAction(league)),
			updateLeague: (league) => dispatch(updateLeagueAction(league)),
		})
	)
	class LeagueDecorator extends Component {
		componentDidMount() {
			const props = this.props;
			if(!props.leagues.data || !props.leagues.data.leagues) {
				props.getAllLeagues();
			}

		}
		componentDidUpdate(prevProps) {
			if(this.props.user.data && this.props.user.data !== prevProps.user.data) {
				this.props.getLeagueByUser(this.props.user.data);
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

	return LeagueDecorator;
}

