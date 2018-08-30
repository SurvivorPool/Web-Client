import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Card, Dropdown, Form } from 'semantic-ui-react'
import { withToastManager } from "react-toast-notifications";

import MessagesDecorator from "../../../Messages/Decorator/MessagesDecorator";

const className = "PlayerTeamAdmin";

const actions = [
	{
		key: 'create',
		value: 'create',
		text: 'Create',
	},
];

@withToastManager
@MessagesDecorator
class MessagesAdmin extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
			messagesLoading: false,
			messageText: '',
			show_message: true,
			message_type: 1,
			userIds: [],
		}
	}

	onSubmitSuccess() {
		const props = this.props;
		props.toastManager.add(`Success`, { appearance: 'success', autoDismiss: true });
		//props.getAllMessages();
	}

	onSubmitFailure(error) {
		const message = `${error.status} : ${error.message}`;
		this.props.toastManager.add(message, { appearance: 'error', autoDismiss: true});
		//props.getAllMessages();
	}

	handleActionChange(e, { value }) {
		this.setState({
			action: value,
			playerTeamId: null,
			isActive: false,
			hasPaid: false,
			playerTeamName: '',
		});
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
			user_id: (this.state.userIds || []).join(','),
		};

		switch(this.state.action) {
			case 'create':
				submit = this.props.createMessage;
				break;
			default:
				console.log('How did you get here?', this.state.action);
				break;
		}

		submit(message).then(this.onSubmitSuccess).catch(this.onSubmitFailure);
	}

	handleMessagesSelection(e, { value }) {
		/*const playerTeamInfo = this.props.allPlayerTeams.data.leagues.find(league => league.league_id === value);
		this.setState({
			playerTeamId: playerTeamInfo.league_id,
			isActive: playerTeamInfo.league_name,
			hasPaid: playerTeamInfo.league_description,
		});*/
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
		// renderMessages
		messages.map(message => {
			return <div>
				{JSON.stringify(message)}
			</div>;
		});
	}

	renderMessageForm(action) {
		// message users and type

		return action === 'create' ? (
			<React.Fragment>
				<Card.Content description={'Create Message'}/>
				<Form
					loading={this.state.messagesLoading}
					className={`${className}__Form`}
					onSubmit={this.handleSubmit}
				>
					{this.renderMessagesDropdown()}
					<Form.Field>
						<Form.Input
							fluid
							label='Team Name'
							value={this.state.playerTeamName}
						/>
					</Form.Field>
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
				{this.renderMessageForm(action)}
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
