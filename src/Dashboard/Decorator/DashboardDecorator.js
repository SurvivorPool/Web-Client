import React, { Component } from 'react';
import { connect } from 'react-redux';

import authSelector from "../../Common/Auth/Selector/authSelector";
import userSelector from "../../Common/Auth/Selector/userSelector";
import leagueSelector from "../../League/Selector/leagueSelector";
import leaguesSelector from "../../League/Selector/leaguesSelector";
import playerLeaguesSelector from "../../League/Selector/playerLeaguesSelector";

import userGetAction from '../../Common/Auth/Action/userGetAction';
import getAllLeaguesAction from "../../League/Action/getAllLeaguesAction";
import getLeagueByUserAction from "../../League/Action/getLeagueByUserAction";

export default function(DecoratedComponent) {
	@connect(
		state => ({
			auth: authSelector(state),
			user: userSelector(state),
			league: leagueSelector(state),
			leagues: leaguesSelector(state),
			playerLeagues: playerLeaguesSelector(state),
		}),
		dispatch => ({
			getUser: (user) => dispatch(userGetAction(user)),
			getAllLeagues: () => dispatch(getAllLeaguesAction()),
			getLeagueByUser: (user) => dispatch(getLeagueByUserAction(user)),
		})
	)
	class DashboardDecorator extends Component {
		componentDidMount() {
			this.props.getUser({user_id: this.props.auth.data.uid});
			this.props.getAllLeagues();
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

	return DashboardDecorator;
}

