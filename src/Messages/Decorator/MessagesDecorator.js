import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';

import getAllMessagesAction from "../Action/getAllMessagesAction";
import createMessageAction from "../Action/createMessageAction";
import getMessagesByUserAction from "../Action/getMessagesByUserAction";

import messagesSelector from "../Selector/messagesSelector";
import userSelector from "../../Common/Auth/Selector/userSelector";

export default function(DecoratedComponent) {
	@connect(
		state => ({
			messages: messagesSelector(state),
			user: userSelector(state),
		}),
		dispatch => ({
			createMessage: message => dispatch(createMessageAction(message)),
			getAllMessages: () => dispatch(getAllMessagesAction()),
			getMessagesByUserAction: user => dispatch(getMessagesByUserAction(user)),
		})
	)
	class MessagesDecorator extends Component {
		constructor(props) {
			super(props);
			autoBind(this);
		}

		componentDidMount() {
			this.props.getAllMessages();
		}

		loadUserMessages() {
			const props = this.props;
			if(props.user && props.user.data) {
				props.getMessagesByUserAction(props.user.data);
			}
		}

		render() {
			return (
				<DecoratedComponent
					{...this.props}
					loadUserMessages={this.loadUserMessages}
				/>
			)
		}
	}

	return MessagesDecorator;
}

