import React, { Component } from 'react';
import { connect } from 'react-redux';

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
		componentDidMount() {
			const props = this.props;
			if(props.user && !props.user.data) {
				props.getUser({user_id: props.auth.data.uid});
			}
		}
		render() {
			return (
				<DecoratedComponent {...this.props}/>
			)
		}
	}

	return UserDecorator;
}

