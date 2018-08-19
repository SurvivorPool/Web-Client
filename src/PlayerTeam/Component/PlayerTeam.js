import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { Card, Icon, Image } from 'semantic-ui-react';
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
			isLoading: false,
		}
	}

	onDeleteTeamSuccess() {
		const props = this.props;
		this.setState({
			isDeletingTeam: false,
			isLoading: false,
		});
		props.toastManager.add('Deleted Team Successfully', { appearance: 'success', autoDismiss: true });
		props.loadLeague();
	}

	onAddTeamFailure(e) {
		const props = this.props;
		this.setState({
			isDeletingTeam: false,
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

	deleteTeam() {
		const props = this.props;
		this.setState({
			isLoading: true,
		});

		this.props.deletePlayerTeam(
			{
				user_id: props.team.user_info.user_id,
				team_id: props.team.team_id,
			}
		).then(this.onDeleteTeamSuccess).catch(e => this.onDeleteTeamSuccess(e));
	}

	cancelAction() {
		this.setState({
			isLoading: false,
			isDeletingTeam: false,
		});
	}

	static renderTeamExtra(team) {
		const hasPaidColor = team.has_paid ? 'green' : 'red';
		const isActiveColor = team.is_active ? 'green' : 'red';
		const isActiveIcon = team.is_active ? 'checkmark' : 'cancel';

		return (
			<React.Fragment>
				<Icon name={'dollar'} color={hasPaidColor} />
				<Icon name={isActiveIcon} color={isActiveColor} />
			</React.Fragment>
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

		return canDelete ? (
			<Icon
				name={'trash'}
				color={'orange'}
				onClick={this.handleDeleteTeam}
			/>
		) : null;
	}

	render() {
		const { team } = this.props;
		return (
			<Card color={this.props.cardColor}>
				<Card.Content>
					<Image
						floated='right'
						circular
						size='mini'
						src={team.user_info.picture_url}
					/>
					<Card.Header>{team.team_name}</Card.Header>
					<Card.Description>{'Current Pick goes here?'}</Card.Description>
					<Card.Description>{this.renderDeleteTeam(team)}</Card.Description>
				</Card.Content>
				<Card.Content
					extra
				>
					{PlayerTeam.renderTeamExtra(team)}
				</Card.Content>
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
