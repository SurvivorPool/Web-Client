import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';

import getAllMessagesAction from "../Action/getAllMessagesAction";
import createMessageAction from "../Action/createMessageAction";
import updateMessageAction from "../Action/updateMessageAction";
import getMessagesByUserAction from "../Action/getMessagesByUserAction";

import messagesSelector from "../Selector/messagesSelector";

export default function(DecoratedComponent) {
	@connect(
		state => ({
			messages: messagesSelector(state),
		}),
		dispatch => ({
			createMessage: message => dispatch(createMessageAction(message)),
			getAllMessages: () => dispatch(getAllMessagesAction()),
			getMessagesByUserAction: user => dispatch(getMessagesByUserAction(user)),
			updateMessage: message => dispatch(updateMessageAction(message)),
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

