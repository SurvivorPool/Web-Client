import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';

import getAllMessagesAction from "../Action/getAllMessagesAction";
import createMessageAction from "../Action/createMessageAction";
import updateMessageAction from "../Action/updateMessageAction";
import getMessagesByUserAction from "../Action/getMessagesByUserAction";
import markReadMessageAction from "../Action/markReadMessageAction";

import messagesSelector from "../Selector/messagesSelector";
import unreadMessagesSelector from "../Selector/unreadMessagesSelector";

export default function(DecoratedComponent) {
	@connect(
		state => ({
			messages: messagesSelector(state),
			unreadMessages: unreadMessagesSelector(state),
		}),
		dispatch => ({
			createMessage: message => dispatch(createMessageAction(message)),
			getAllMessages: () => dispatch(getAllMessagesAction()),
			getMessagesByUser: userId => dispatch(getMessagesByUserAction(userId)),
			updateMessage: message => dispatch(updateMessageAction(message)),
			markMessageRead: message => dispatch(markReadMessageAction(message)),
		})
	)
	class MessagesDecorator extends Component {
		constructor(props) {
			super(props);
			autoBind(this);
		}

		render() {
			return (
				<DecoratedComponent
					{...this.props}
				/>
			)
		}
	}

	return MessagesDecorator;
}

