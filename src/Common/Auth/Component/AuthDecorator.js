import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import authSelector from '../Selector/authSelector';

import logoutAction from '../Action/logoutAction';
import loginAction from '../Action/loginAction';
import userAuthTokenAction from '../Action/userAuthTokenAction';

export default function(DecoratedComponent) {
	@connect(
		state => ({
			auth: authSelector(state),
		}),
		dispatch => ({
			logout: () => dispatch(logoutAction()),
			login: provider => dispatch(loginAction(provider)),
			setAuthToken: auth => dispatch(userAuthTokenAction(auth)),
		})
	)
	class AuthDecorator extends Component {
		componentDidMount() {
			const props = this.props;
			firebase.auth().onAuthStateChanged(function (user) {
				if (user) {
					firebase.auth().currentUser.getIdToken(true).then(token => {
						props.setAuthToken({token});
					});
				}
			})
		}
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

