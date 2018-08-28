import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Container, Card } from 'semantic-ui-react'
import { withToastManager } from "react-toast-notifications";

const className = "PlayerTeamAdmin";

@withToastManager
class PlayerTeamAdmin extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
		}
	}


	onSubmitSuccess() {
		const props = this.props;
		props.toastManager.add(`Success`, { appearance: 'success', autoDismiss: true });
	}

	onSubmitFailure(error) {
		const message = `${error.status} : ${error.message}`;
		this.props.toastManager.add(message, { appearance: 'error', autoDismiss: true});
	}

	renderPlayerTeamCard() {
		return (
			<Card
				color={"green"}
				className={`${className}__Card`}
				fluid
			>
				<Card.Content header='PlayerTeams' />
			</Card>
		);
	}

	render() {
		return (
			<Container className={`${className}__Section`}>
				{this.renderPlayerTeamCard()}
			</Container>
		);
	}
}

export default PlayerTeamAdmin;
