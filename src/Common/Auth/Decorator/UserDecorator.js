import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from "react-autobind";

import userSelector from '../Selector/userSelector';
import authSelector from '../Selector/authSelector';
import usersSelector from "../Selector/usersSelector";

import userGetAction from '../Action/userGetAction';
import userSetNotificationAction from "../Action/userSetNotificationAction";
import usersClearAction from "../Action/usersClearAction";
import usersGetAction from "../Action/usersGetAction";


export default function(DecoratedComponent) {
	@connect(
		state => ({
			auth: authSelector(state),
			user: userSelector(state),
			users: usersSelector(state),
		}),
		dispatch => ({
			getUser: (user) => dispatch(userGetAction(user)),
			setNotification: (user) => dispatch(userSetNotificationAction(user)),
			getUsers: () => dispatch(usersGetAction()),
			clearUsers: () => dispatch(usersClearAction()),
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

