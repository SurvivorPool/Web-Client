import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Card, Checkbox, Dropdown, Form } from 'semantic-ui-react'
import { withToastManager } from "react-toast-notifications";

import MessagesDecorator from "../../../Messages/Decorator/MessagesDecorator";
import UserDecorator from "../../../Common/Auth/Decorator/UserDecorator";

const className = "PlayerTeamAdmin";

const actions = [
	{
		key: 'create',
		value: 'create',
		text: 'Create',
	},
	{
		key: 'update',
		value: 'update',
		text: 'Update',
	},
];

const messageTypes = [
	{
		key: 1,
		value: 1,
		text: 'DEFAULT',
	}
];

@withToastManager
@UserDecorator
@MessagesDecorator
class MessagesAdmin extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
			messagesLoading: false,
			messageText: '',
			showMessage: true,
			messageType: 1,
			userIds: [],
			messageId: '',
			sendAllUsers: false,
		}
	}

	componentDidMount() {
		if(!this.props.messages.data) {
			this.props.getAllMessages();
		}

		if(!this.props.users.data) {
			this.props.getUsers();
		}
	}

	componentWillUnmount() {
		this.props.clearUsers();
	}

	onSubmitSuccess() {
		const props = this.props;
		props.toastManager.add(`Success`, { appearance: 'success', autoDismiss: true });
		props.getAllMessages();
		this.setState({
			messagesLoading: false,
		});
		this.handleResetForm();
	}

	onSubmitFailure(error) {
		const props = this.props;
		const message = `${error.status} : ${error.message}`;
		props.toastManager.add(message, { appearance: 'error', autoDismiss: true});
		props.getAllMessages();
		this.handleResetForm();
	}

	handleActionChange(e, { value }) {
		this.setState({
			action: value,
			messageText: '',
			showMessage: true,
			messageType: 1,
			userIds: [],
		});
	}

	handleResetForm() {
		this.setState({
			messagesLoading: false,
			messageText: '',
			showMessage: true,
			messageType: 1,
			userIds: [],
			messageId: '',
		});
	}

	handleChange(e, { name, value }) {
		this.setState({[name]: value})
	}

	handleSubmit() {
		this.setState({
			messagesLoading: true,
		});

		let submit = () => {};
		const message = {
			message_text: this.state.messageText,
			show_message: this.state.showMessage,
			message_type: this.state.messageType,
			user_ids: (this.state.userIds || []).join(','),
			all_users: this.state.sendAllUsers,
		};

		switch(this.state.action) {
			case 'create':
				submit = this.props.createMessage;
				break;
			case 'update':
				message.message_id = this.state.messageId;
				submit = this.props.updateMessage;
				break;
			default:
				console.log('How did you get here?', this.state.action);
				break;
		}

		submit(message).then(this.onSubmitSuccess).catch(this.onSubmitFailure);
	}

	handleShowMessageChange() {
		this.setState(prevState => {
			return {
				showMessage: !prevState.showMessage,
			}
		});
	}

	handleAllUsersChange() {
		this.setState(prevState => {
			return {
				sendAllUsers: !prevState.sendAllUsers,
				userIds: [],
			}
		});
	}

	handleUserSearch(users, term){
		const lowerTerm = term.toLowerCase();
		return users.filter(user => {
			return user.name.toLowerCase().includes(lowerTerm)
				|| user.email.toLowerCase().includes(lowerTerm);
		});
	}

	handleUserSelection(e, { value }) {
		this.setState({
			userIds: value,
		});
	}

	handleMessagesSelection(e, { value }) {
		const messageInfo = this.props.messages.data.messages.find(message => message.message_id === value);

		this.setState({
			messageText: messageInfo.message_text,
			showMessage: messageInfo.show_message,
			messageType: messageInfo.message_type,
			userIds: messageInfo.user_id || [],
			messageId: messageInfo.message_id,
		});
	}

	static formatUsers(users) {
		return users.length ? users.map(user => {
			return {
				key: user.user_id,
				value: user.user_id,
				text: `${user.full_name}  -  ${user.email}`,
				email: user.email,
				name: user.full_name,
			};
		}) : [];
	}

	static formatMessages(messages) {
		return messages.length ? messages.map(message => {
			return {
				key: message.message_id,
				value: message.message_id,
				text:  message.message_text,
			};
		}) : [];
	}

	renderActionDropdown() {
		return (
			<Dropdown
				placeholder='Action'
				selection
				options={actions}
				value={this.state.action}
				onChange={this.handleActionChange}
			/>
		)
	}

	renderMessagesDropdown() {
		const messages = (this.props.messages.data && this.props.messages.data.messages) || [];
		return (
			<Form.Dropdown
				deburr
				fluid
				placeholder='Search Messages..'
				selection
				options={MessagesAdmin.formatMessages(messages)}
				value={this.state.messageId}
				search
				name={'messageId'}
				onChange={this.handleMessagesSelection}
			/>
		);
	}

	renderUsersDropdown() {
		const users = (this.props.users.data && this.props.users.data.users) || [];

		return (
			<Form.Dropdown
				disabled={this.state.sendAllUsers}
				deburr
				fluid
				options={MessagesAdmin.formatUsers(users)}
				placeholder='Search Users..'
				search={this.handleUserSearch}
				multiple
				selection
				value={this.state.userIds}
				onChange={this.handleUserSelection}
			/>
		);
	}

	renderMessageTypeDropdown() {
		return (
			<Dropdown
				placeholder='Type'
				selection
				options={messageTypes}
				value={parseInt(this.state.messageType, 10)}
				onChange={this.handleChange}
			/>
		);
	}

	renderShowMessageToggle() {
		return (
			<Checkbox
				checked={!!this.state.showMessage}
				toggle
				label='Show Message'
				name={'showMessage'}
				onChange={this.handleShowMessageChange}
			/>
		);
	}

	renderAllUsersToggle() {
		return (
			<Checkbox
				checked={!!this.state.sendAllUsers}
				toggle
				label='All Users'
				name={'sendAllUsers'}
				onChange={this.handleAllUsersChange}
			/>
		);
	}

	renderMessageCreate(action) {
		return action === 'create' ? (
			<React.Fragment>
				<Card.Content description={'Create Message'}/>
				<Form
					loading={this.state.messagesLoading}
					className={`${className}__Form`}
					onSubmit={this.handleSubmit}
				>
					<Form.Field>
						{this.renderUsersDropdown()}
					</Form.Field>
					<Form.Field>
						{this.renderAllUsersToggle()}
					</Form.Field>
					<Form.Group widths={'equal'}>
						<Form.Field>
							{this.renderMessageTypeDropdown()}
						</Form.Field>
						<Form.Field>
							{this.renderShowMessageToggle()}
						</Form.Field>
					</Form.Group>
					<Form.TextArea
						required
						label='Message Text'
						placeholder='Text'
						name={'messageText'}
						value={this.state.messageText}
						onChange={this.handleChange}
					/>
					<Form.Button content={'Submit'}/>
				</Form>
			</React.Fragment>
		) : null;
	}

	renderMessageUpdate(action) {
		return action === 'update' ? (
			<React.Fragment>
				<Card.Content description={'Create Message'}/>
				<Form
					loading={this.state.messagesLoading}
					className={`${className}__Form`}
					onSubmit={this.handleSubmit}
				>
					<Form.Field>
						{this.renderMessagesDropdown()}
					</Form.Field>
					<Form.Field>
						{this.renderUsersDropdown()}
					</Form.Field>
					<Form.Field>
						{this.renderAllUsersToggle()}
					</Form.Field>
					<Form.Group widths={'equal'}>
						<Form.Field>
							{this.renderMessageTypeDropdown()}
						</Form.Field>
						<Form.Field>
							{this.renderShowMessageToggle()}
						</Form.Field>
					</Form.Group>
					<Form.TextArea
						required
						label='Message Text'
						placeholder='Text'
						name={'messageText'}
						value={this.state.messageText}
						onChange={this.handleChange}
					/>
					<Form.Button content={'Submit'}/>
				</Form>
			</React.Fragment>
		) : null;
	}

	renderMessagesCard() {
		const { action } = this.state;
		return (
			<Card
				color={"blue"}
				className={`${className}__Card`}
				fluid
			>
				<Card.Content header='Messages' />
				<Card.Content>
					{this.renderActionDropdown()}
				</Card.Content>
				{this.renderMessageCreate(action)}
				{this.renderMessageUpdate(action)}
			</Card>
		);
	}

	render() {
		return (
			<div className={`${className}__Section`}>
				{this.renderMessagesCard()}
			</div>
		);
	}
}

export default MessagesAdmin;
