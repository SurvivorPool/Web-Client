import React, { Component } from 'react';
import { connect } from 'react-redux';

import userSelector from '../Selector/userSelector';

import userGetAction from '../Action/userGetAction';

export default function(DecoratedComponent) {
	@connect(
		state => ({
			user: userSelector(state),
		}),
		dispatch => ({
			userGet: (user) => dispatch(userGetAction(user)),
		})
	)
	class UserDecorator extends Component {
		render() {
			return (
				<DecoratedComponent {...this.props}/>
			)
		}
	}

	return UserDecorator;
}

