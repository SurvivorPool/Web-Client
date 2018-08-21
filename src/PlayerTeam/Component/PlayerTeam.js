import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import {Card, Form, Icon, Image} from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { withToastManager } from "react-toast-notifications";

import PrimaryButton from "../../Common/Button/PrimaryButton";
import SecondaryButton from "../../Common/Button/SecondaryButton";

import PlayerTeamDecorator from "../Decorator/PlayerTeamDecorator";

const className = 'PlayerTeam';

@withToastManager
@PlayerTeamDecorator
class PlayerTeam extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
			isDeletingTeam: false,
			isEditingTeam: false,
			isLoading: false,
			teamName: props.team.team_name || '',
		}
	}

	onTeamSuccess(action) {
		const props = this.props;
		this.setState({
			isDeletingTeam: false,
			isEditingTeam: false,
			isLoading: false,
		});

		const messageAction = action === 'delete' ? 'Deleted' : 'Edited';

		props.toastManager.add(`${messageAction} Team Successfully`, { appearance: 'success', autoDismiss: true });
		props.loadLeague();
	}

	onTeamFailure(e) {
		const props = this.props;
		this.setState({
			isDeletingTeam: false,
			isEditingTeam: false,
			isLoading: false,
		});
		props.toastManager.add('Oh no, something terrible happened!', { appearance: 'error' });
		props.loadLeague();
	}

	handleDeleteTeam() {
		this.setState({
			isDeletingTeam: true,
		});
	}

	handleEditTeam() {
		this.setState({
			isEditingTeam: true,
		});
	}

	handleChange(e, { name, value }) {
		this.setState({[name]: value})
	}

	cancelAction(e) {
		e.stopPropagation();
		this.setState({
			isLoading: false,
			isDeletingTeam: false,
			isEditingTeam: false,
		});
	}

	deleteTeam() {
		const props = this.props;
		this.setState({
			isLoading: true,
		});

		const onSuccess = () => this.onTeamSuccess('delete');

		this.props.deletePlayerTeam(
			{
				user_id: props.team.user_info.user_id,
				team_id: props.team.team_id,
			}
		).then(onSuccess).catch(this.onTeamFailure);
	}

	editTeam() {
		const props = this.props;
		this.setState({
			isLoading: true,
		});

		const onSuccess = () => this.onTeamSuccess('edit');

		this.props.updatePlayerTeam(
			{
				user_id: props.team.user_info.user_id,
				league_id: props.leagueId,
				team_id: props.team.team_id,
				team_name: this.state.teamName,
			}
		).then(onSuccess).catch(this.onTeamFailure);
	}

	static renderTeamExtra(team, leagueId) {
		const hasPaidColor = team.has_paid ? 'green' : 'red';
		const isActiveColor = team.is_active ? 'green' : 'red';
		const isActiveIcon = team.is_active ? 'checkmark' : 'cancel';

		return (
			<Card.Content
				className={`${className}__Extra`}
				extra
			>
				<Icon
					name={'dollar'}
					color={hasPaidColor}
				/>
				<Icon
					name={isActiveIcon}
					color={isActiveColor}
				/>
				<Link
					className={`${className}__Link`}
					to={`/league/${leagueId}/team/${team.team_id}`}
				>
					{"View Team"}
				</Link>
			</Card.Content>
		);
	}

	renderDeleteTeam(team) {
		const canDelete = !team.has_paid;

		if(this.state.isDeletingTeam) {
			return (
				<div className='ui two buttons'>
					{"Are you sure you want to delete this team?"}
					<PrimaryButton
						onClick={this.deleteTeam}
					>
						{"Delete"}
					</PrimaryButton>
					<SecondaryButton
						onClick={this.cancelAction}
					>
						{"Cancel"}
					</SecondaryButton>
				</div>
			);
		}

		return canDelete && !this.state.isEditingTeam ? (
			<Icon
				className={`${className}__Trash`}
				name={'trash'}
				color={'orange'}
				onClick={this.handleDeleteTeam}
			/>
		) : null;
	}

	renderEditTeam(team) {
		const canEdit = !team.has_paid;

		if(this.state.isEditingTeam) {
			return (
				<Form
					className={`${className}__Form`}
					onSubmit={this.editTeam}
				>
					<Form.Input
						fluid
						required
						label='Team Name'
						placeholder='Team'
						name={'teamName'}
						value={this.state.teamName}
						onChange={this.handleChange}
					/>
					<div className='ui two buttons'>
						<PrimaryButton>
							{"Edit"}
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


		return canEdit && !this.state.isDeletingTeam ? (
			<Icon
				className={`${className}__Wrench`}
				name={'wrench'}
				onClick={this.handleEditTeam}
			/>
		) : null;
	}

	renderTeamActions(team) {
		return (
			<Card.Description
				className={`${className}__Actions`}
			>
				{this.renderEditTeam(team)}
				{this.renderDeleteTeam(team)}
			</Card.Description>
		);
	}

	render() {
		const { team } = this.props;

		return (
			<Card
				className={className}
				color={this.props.cardColor}
				onClick={this.handleRedirect}
			>
				<Card.Content>
					<Image
						floated='right'
						circular
						size='mini'
						src={team.user_info.picture_url}
					/>
					<Card.Header>{team.team_name}</Card.Header>
					<Card.Description>{'Current Pick goes here?'}</Card.Description>
					{this.renderTeamActions(team)}
				</Card.Content>
				{PlayerTeam.renderTeamExtra(team, this.props.leagueId)}
			</Card>
		);
	}
}

PlayerTeam.defaultProps = {
	cardColor: 'white',
	loadLeague: () => {},
};

PlayerTeam.propTypes = {
	team: PropTypes.object.isRequired,
	cardColor: PropTypes.string,
	loadLeague: PropTypes.func,
};

export default PlayerTeam;