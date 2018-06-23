import React, { Component } from 'react';
import { connect } from 'react-redux';

import authSelector from '../Util/authSelector';

import logoutAction from '../Action/logoutAction';
import loginAction from '../Action/loginAction';

export default function(DecoratedComponent) {
	@connect(
		state => ({
			auth: authSelector(state),
		}),
		dispatch => ({
			logout: () => dispatch(logoutAction()),
			login: provider => dispatch(loginAction(provider))
		})
	)
	class AuthDecorator extends Component {
		render() {
			const props = this.props;
			return (
				<DecoratedComponent
					{...props}
					logout={props.logout}
					login={props.login}
					isLoggedIn={!!(props.auth.data && props.auth.data.isLoggedIn)}
				/>
			)
		}
	}

	return AuthDecorator;
}

