import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { Card, Form, Icon } from 'semantic-ui-react';
import { withToastManager } from "react-toast-notifications";

import PrimaryButton from "../../Common/Button/PrimaryButton";
import SecondaryButton from "../../Common/Button/SecondaryButton";

import PlayerTeamDecorator from "../Decorator/PlayerTeamDecorator";

const className = "PlayerTeamAdd";

@withToastManager
@PlayerTeamDecorator
class PlayerTeamAdd extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
			isAddingTeam: false,
			isLoading: false,
			teamName: '',
		}
	}

	onAddTeamSuccess() {
		this.setState({
			isAddingTeam: false,
			isLoading: false,
		});
		const { toastManager } = this.props;
		toastManager.add('Added Team Successfully', { appearance: 'success', autoDismiss: true });
		this.props.loadUser().then(this.props.loadLeague)
	}

	onAddTeamFailure(e) {
		this.setState({
			isAddingTeam: false,
			isLoading: false,
		});
		const { toastManager } = this.props;
		toastManager.add('Oh no, something terrible happened!', { appearance: 'error' });
		this.props.loadUser().then(this.props.loadLeague)
	}

	handleAddTeam() {
		this.setState({
			isAddingTeam: true,
		});
	}

	handleSubmit() {
		const props = this.props;
		this.setState({
			isLoading: true,
		});

		this.props.createPlayerTeam(
			{
				user_id: props.userId,
				league_id: props.leagueId,
				team_name: this.state.teamName,
			}
		).then(this.onAddTeamSuccess).catch(e => this.onAddTeamFailure(e));
	}

	handleChange(e, { name, value }) {
		this.setState({[name]: value})
	}

	cancelAction(e) {
		e.stopPropagation();
		e.preventDefault();
		this.setState({
			isAddingTeam: false,
		});
	}

	renderAddTeamForm() {
		return (
			<Form
				className={`${className}__Form`}
				onSubmit={this.handleSubmit}
			>
				<Form.Input
					fluid
					required
					label='Team Name'
					placeholder='Team'
					name={'teamName'}
					value={this.state.teamName}
					onChange={this.handleChange}
					maxLength={"30"}
				/>
				<div className='ui two buttons'>
					<PrimaryButton>
						{"Add"}
					</PrimaryButton>
					<SecondaryButton
						onClick={this.cancelAction}
					>
						{"Cancel"}
					</SecondaryButton>
				</div>
			</Form>
		);
	}

	renderCardContent() {
		if(this.state.isAddingTeam) {
			return this.renderAddTeamForm();
		}

		return (
			<Card.Description className={`${className}__Container`}>
				<Icon name={'plus'}  />
			</Card.Description>
		);
	}

	render() {
		return (
			<Card
				color={'purple'}
				onClick={this.handleAddTeam}
			>
				<Card.Content>
					<Card.Header textAlign='center'>
						{"Add a Team"}
					</Card.Header>
					{this.renderCardContent()}
				</Card.Content>
			</Card>
		);
	}
}

PlayerTeamAdd.defaultProps = {
	loadLeague: () => {},
	loadUser: () => {},
};

PlayerTeamAdd.propTypes = {
	leagueId: PropTypes.number.isRequired,
	userId: PropTypes.string.isRequired,
	loadLeague: PropTypes.func,
	loadUser: PropTypes.func,
};

export default PlayerTeamAdd;
