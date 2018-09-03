import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import {Card, Form, Icon, Image, Label} from 'semantic-ui-react';
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
		props.loadUser().then(props.loadLeague);
	}

	onTeamFailure(e) {
		const props = this.props;
		this.setState({
			isDeletingTeam: false,
			isEditingTeam: false,
			isLoading: false,
		});
		props.toastManager.add('Oh no, something terrible happened!', { appearance: 'error' });
		props.loadUser().then(props.loadLeague);
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

	static renderTeamExtra(team, leagueId, price, leagueType) {
		const isActiveColor = team.is_active ? 'green' : 'red';
		const isActiveIcon = team.is_active ? 'checkmark' : 'cancel';

		return (
			<Card.Content
				className={`${className}__Extra`}
				extra
			>
				{PlayerTeam.renderTeamDue(price, !!team.has_paid, leagueType)}
				<Label
					color={isActiveColor}
					size={'tiny'}
				>
					<Icon
						name={isActiveIcon}
					/>
					<Label.Detail>
						{team.is_active ? "Active" : "Sunk"}
					</Label.Detail>
				</Label>
				<Link
					className={`${className}__Link`}
					to={`/league/${leagueId}/team/${team.team_id}`}
				>
					{"View Team"}
				</Link>
			</Card.Content>
		);
	}

	static renderTeamDue(price, hasPaid, leagueType) {
		const hasPaidColor = hasPaid ? 'green' : 'red';

		return leagueType !== 'FREE' ? (
			<Label
				color={hasPaidColor}
				size={'tiny'}
			>
				<Icon
					name={'dollar'}
				/>
				{!hasPaid ? price : ''}
				<Label.Detail>
					{hasPaid ? "Paid" : 'Due'}
				</Label.Detail>
			</Label>
		) : null;
	}

	renderDeleteTeam(team, leagueIsActive) {
		const canDelete = !leagueIsActive;

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
						maxLength={"30"}
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

	renderTeamActions(team, leagueIsActive) {
		return (
			<Card.Description
				className={`${className}__Actions`}
			>
				{this.renderEditTeam(team)}
				{this.renderDeleteTeam(team, leagueIsActive)}
			</Card.Description>
		);
	}

	static renderTeamPick(team, user) {
		const userTeams = (user && user.teams) || [];
		const currentTeam = userTeams.find(userTeam => userTeam.team_id === team.team_id) || {};
		const currentTeamPick = currentTeam.current_pick || [];

		return currentTeamPick && currentTeamPick.length > 0 ? (
			<Card.Description>
				<span>{`Currently Picked - ${currentTeamPick[0]}`}</span>
			</Card.Description>
		) : null;
	}

	render() {
		const { team, user, leagueId, price, leagueType, leagueIsActive } = this.props;

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
					<div
						className={`${className}__Header`}
					>
						{team.team_name}
					</div>
					{this.renderTeamActions(team, leagueIsActive)}
					{PlayerTeam.renderTeamPick(team, user)}
				</Card.Content>
				{PlayerTeam.renderTeamExtra(team, leagueId, price, leagueType )}
			</Card>
		);
	}
}

PlayerTeam.defaultProps = {
	cardColor: 'white',
	loadLeague: () => {},
	loadUser: () => {},
};

PlayerTeam.propTypes = {
	team: PropTypes.object.isRequired,
	cardColor: PropTypes.string,
	loadLeague: PropTypes.func,
	leagueId: PropTypes.number.isRequired,
	loadUser: PropTypes.func,
	user: PropTypes.object.isRequired,
	price: PropTypes.string.isRequired,
	leagueType: PropTypes.string.isRequired,
	leagueIsActive: PropTypes.bool.isRequired,
};


export default PlayerTeam;
