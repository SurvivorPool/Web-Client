import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from "react-autobind";

import userSelector from '../Selector/userSelector';
import authSelector from '../Selector/authSelector';

import userGetAction from '../Action/userGetAction';

export default function(DecoratedComponent) {
	@connect(
		state => ({
			user: userSelector(state),
			auth: authSelector(state),
		}),
		dispatch => ({
			getUser: (user) => dispatch(userGetAction(user)),
		})
	)
	class UserDecorator extends Component {
		constructor(props) {
			super(props);
			autoBind(this);
		}

		loadUser() {
			const props = this.props;

			if(props.user && props.user.data) {
				return props.getUser(props.user.data);
			}

			return Promise.resolve();
		}

		render() {
			return (
				<DecoratedComponent
					{...this.props}
					loadUser={this.loadUser}
				/>
			)
		}
	}

	return UserDecorator;
}

