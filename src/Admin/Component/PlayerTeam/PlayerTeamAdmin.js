import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { Card, Dropdown, Checkbox, Form } from 'semantic-ui-react'
import { withToastManager } from "react-toast-notifications";

import PlayerTeamDecorator from "../../../PlayerTeam/Decorator/PlayerTeamDecorator";

const className = "PlayerTeamAdmin";

const actions = [
	{
		key: 'update',
		value: 'update',
		text: 'Update',
	},
	{
		key: 'delete',
		value: 'delete',
		text: 'Delete'
	},
];


@withToastManager
@PlayerTeamDecorator
class PlayerTeamAdmin extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
			action: '',
			playerTeamId: null,
			isActive: false,
			hasPaid: false,
			playerName: '',
			playerTeamName: '',
			playerTeamLoading: false,
		}
	}

	componentDidMount() {
		if(!this.props.playerTeams.data) {
			this.props.adminGetAllPlayerTeams();
		}
	}

	handleActiveChange() {
		this.setState(prevState => {
			return {
				isActive: !prevState.isActive,
			}
		});
	}

	handlePaidChange() {
		this.setState(prevState => {
			return {
				hasPaid: !prevState.hasPaid,
			}
		});
	}

	handleActionChange(e, { value }) {
		this.setState({
			action: value,
			playerTeamId: null,
			isActive: false,
			hasPaid: false,
			playerTeamName: '',
			playerName: '',
		});
	}

	onSubmitSuccess() {
		const props = this.props;
		props.toastManager.add(`Success`, { appearance: 'success', autoDismiss: true });
		props.adminGetAllPlayerTeams();
		this.setState({
			playerTeamLoading: false,
		});
	}

	onSubmitFailure(error) {
		const props = this.props;
		const message = `${error.status} : ${error.message}`;
		props.toastManager.add(message, { appearance: 'error', autoDismiss: true});
		props.adminGetAllPlayerTeams();
		this.setState({
			playerTeamLoading: false,
		});
	}

	handleSubmit() {
		this.setState({
			playerTeamLoading: true,
		});

		let submit = () => {};
		const team = {
			team_id: this.state.playerTeamId,
			has_paid: this.state.hasPaid,
			is_active: this.state.isActive,
		};

		switch(this.state.action) {
			case 'update':
				submit = this.props.adminUpdatePlayerTeam;
				break;
			case 'delete':
				submit = this.props.adminDeletePlayerTeam;
				break;
			default:
				console.log('How did you get here?', this.state.action);
				break;
		}

		submit(team).then(this.onSubmitSuccess).catch(this.onSubmitFailure);
	}

	handlePlayerTeamSelection(e, { value }) {
		const playerTeamInfo = this.props.playerTeams.data.teams.find(team => team.team_id === value);
		this.setState({
			playerTeamId: playerTeamInfo.team_id,
			isActive: playerTeamInfo.is_active,
			hasPaid: playerTeamInfo.has_paid,
			playerTeamName: playerTeamInfo.team_name,
			playerName: playerTeamInfo.user_info.full_name,
		});
	}

	handlePlayerTeamSearch(teams, term){
		const lowerTerm = term.toLowerCase();
		return teams.filter(team => {
			return team.text.toLowerCase().includes(lowerTerm)
				|| team.email.toLowerCase().includes(lowerTerm)
				|| team.player.toLowerCase().includes(lowerTerm);
		});
	}

	static formatTeams(teams) {
		return teams.length ? teams.map(team => {
			return {
				key: team.team_id,
				value: team.team_id,
				text: team.team_name,
				email: team.user_info.email,
				player: team.user_info.full_name,
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

	renderPlayerTeamsDropdown() {
		const playerTeams = (this.props.playerTeams.data && this.props.playerTeams.data.teams) || [];
		return (
			<Form.Dropdown
				deburr
				fluid
				options={PlayerTeamAdmin.formatTeams(playerTeams)}
				placeholder='Search PlayerTeams..'
				search={this.handlePlayerTeamSearch}
				selection
				onChange={this.handlePlayerTeamSelection}
			/>
		);
	}

	renderPlayerTeamForm(action) {
		const actionText = action === 'update' ? "Update" : 'Delete';

		return action === 'update' || action === 'delete' ? (
			<React.Fragment>
				<Card.Content description={`${actionText} Team`}/>
				<Form
					loading={this.state.playerTeamLoading}
					className={`${className}__Form`}
					onSubmit={this.handleSubmit}
				>
					{this.renderPlayerTeamsDropdown()}
					<Form.Field>
						<Form.Input
							fluid
							disabled
							label='Team Name'
							name={'teamName'}
							value={this.state.playerTeamName}
						/>
						<Form.Input
							fluid
							disabled
							label='Player Name'
							name={'playerName'}
							value={this.state.playerName}
						/>
					</Form.Field>
					<Form.Group widths={'equal'}>
						<Form.Field>
							<Checkbox
								checked={!!this.state.hasPaid}
								toggle
								label='Paid'
								name={'hasPaid'}
								onChange={this.handlePaidChange}
							/>
						</Form.Field>
						<Form.Field>
							<Checkbox
								checked={!!this.state.isActive}
								toggle
								label='Active'
								name={'isActive'}
								onChange={this.handleActiveChange}
							/>
						</Form.Field>
					</Form.Group>
					<Form.Button content={actionText}/>
				</Form>
			</React.Fragment>
		) : null;
	}

	renderPlayerTeamCard() {
		const { action } = this.state;
		return (
			<Card
				color={"green"}
				className={`${className}__Card`}
				fluid
			>
				<Card.Content header='Player Teams' />
				<Card.Content>
					{this.renderActionDropdown()}
				</Card.Content>
				{this.renderPlayerTeamForm(action)}
			</Card>
		);
	}


	render() {
		return (
			<div className={`${className}__Section`}>
				{this.renderPlayerTeamCard()}
			</div>
		);
	}
}

PlayerTeamAdmin.propTypes = {
	adminUpdatePlayerTeam: PropTypes.func.isRequired,
	adminDeletePlayerTeam: PropTypes.func.isRequired,
};

export default PlayerTeamAdmin;
