import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import autoBind from 'react-autobind';
import { Segment, Container, Card , Icon } from 'semantic-ui-react';

import Profile from "../../Profile/Component/Profile";
import Navbar from "../../Navbar/Component/Navbar";

import MessagesDecorator from "../Decorator/MessagesDecorator";
import AuthDecorator from "../../Common/Auth/Decorator/AuthDecorator";

const className = "MessagesPage";

@AuthDecorator
@MessagesDecorator
class MessagesPage extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	componentDidMount() {
		this.props.getMessagesByUser(this.props.auth.data.uid);
	}

	handleMarkAsRead(message) {
		const formattedMessage = {
			...message,
			read: true,
			user_id: message.user.id,
		};
		this.props.markMessageRead(formattedMessage).then(this.onMarkReadSuccess);
	}

	onMarkReadSuccess() {
		this.props.getMessagesByUser(this.props.auth.data.uid);
	}

	static renderMessages(props, handleMarkRead) {
		const messages = (props.messages.data && props.messages.data.messages) || [];
		return messages.length ? (
			<Segment
				raised
				className={`${className}__Messages`}
			>
				{messages.map(message => MessagesPage.renderMessage(message, handleMarkRead))}
			</Segment>
		) : (
			<Segment
				raised
			>
				{"No New Messages."}
			</Segment>
		);
	}

	static renderUnreadIcon(isUnread) {
		return isUnread ? (
			<Icon name={'exclamation'} color={'red'} />
		) : null;
	}

	static renderMessageHeader(isUnread, message, handleMarkRead) {
		return (
			<div className={`${className}__Message__Header`}>
				{"Message"}
				{MessagesPage.renderUnreadIcon(isUnread)}
				{MessagesPage.renderMarkRead(isUnread, message, handleMarkRead)}
			</div>
		);
	}

	static renderMarkRead(isUnread, message, handleMarkRead) {
		return isUnread ? (
			<div
				className={`${className}__Message__Read`}
				onClick={() => handleMarkRead(message)}
			>
				<Icon name={'envelope open'}/>
				{"Mark as Read"}
			</div>
		) : null;
	}

	static renderMessage(message, handleMarkRead) {
		const isUnread = !message.read;
		return (
			<Card
				fluid
				className={`${className}__Message`}
				key={message.message_id}
			>
				<Card.Content>
					<Card.Header>
						{MessagesPage.renderMessageHeader(isUnread, message, handleMarkRead)}
					</Card.Header>
				</Card.Content>
				<Card.Content>
					{message.message_text}
				</Card.Content>
			</Card>
		)
	}

	static renderHeader() {
		return (
			<div className={`${className}__Header__Container`}>
				<div className={`${className}__Header`}>
					{"Messages"}
				</div>
			</div>
		);
	}

	render() {
		const props = this.props;

		return (
			<div className={className}>
				<Navbar>
					<Link
						to={'/dashboard'}
						className={'Navbar__Link'}
					>
						{"Dashboard"}
					</Link>
					<Profile
						currentPage={'/messages'}
					/>
				</Navbar>
				<div className={`${className}__Content`}>
					<Container>
						{MessagesPage.renderHeader()}
						{MessagesPage.renderMessages(props, this.handleMarkAsRead)}
					</Container>
				</div>
			</div>
		);
	}
}


MessagesPage.defaultProps = {
	messages: {},
};


MessagesPage.propTypes = {
	messages: PropTypes.object,
};

export default MessagesPage;
