import React, { Component } from 'react';
import { connect } from 'react-redux';

import authSelector from '../Util/authSelector';

import logoutAction from '../Action/logoutAction';

export default function(DecoratedComponent) {
	@connect(
		state => ({
			auth: authSelector(state),
		}),
		dispatch => ({
			logout: () => dispatch(logoutAction())
		})
	)
	class AuthDecorator extends Component {
		logout() {
			this.props.logout();
		}

		render() {
			const props = this.props;
			return (
				<DecoratedComponent
					{...props}
					logout={this.logout}
					isLoggedIn={!!(props.auth && props.auth.isLoggedIn)}
				/>
			)
		}
	}

	return AuthDecorator;
}

