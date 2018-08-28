import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { withToastManager } from "react-toast-notifications";

import Navbar from "../../Navbar/Component/Navbar";
import Profile from "../../Profile/Component/Profile";
import PrimaryButton from "../../Common/Button/PrimaryButton";

import LeagueAdmin from "./League/LeagueAdmin";
import PlayerTeamAdmin from "./PlayerTeam/PlayerTeamAdmin";

import AdminDecorator from "../Decorator/AdminDecorator";
import AdminActionsDecorator from "../Decorator/AdminActionsDecorator";
import AuthDecorator from "../../Common/Auth/Decorator/AuthDecorator";

const className = "AdminDashboard";

@withToastManager
@AuthDecorator
@AdminActionsDecorator
@AdminDecorator
class AdminDashboard extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
		}
	}

	populateGames() {
		this.props.populateGames()
			.then(this.onPopulateSucess)
			.catch(this.onPopulateFailure);
	}

	populateTeams() {
		this.props.populateTeams()
			.then(this.onPopulateSucess)
			.catch(this.onPopulateFailure);

		this.props.populateStadiums()
			.then(this.onPopulateSucess)
			.catch(this.onPopulateFailure);
	}

	onPopulateSucess() {
		const { toastManager } = this.props;
		toastManager.add('Populated Successfully', { appearance: 'success', autoDismiss: true });
	}

	onPopulateFailure() {
		const { toastManager } = this.props;
		toastManager.add('Oh no, something terrible happened!', { appearance: 'error' });
	}

	renderPopulateGamesButton() {
		return (
			<PrimaryButton
				onClick={this.populateGames}
			>
				{"Populate Games"}
			</PrimaryButton>
		)
	}

	renderPopulateTeamsButton() {
		return (
			<PrimaryButton
				onClick={this.populateTeams}
			>
				{"Populate Teams"}
			</PrimaryButton>
		);
	}

	render() {
		return (
			<div className={className}>
				<Navbar>
					{this.renderPopulateTeamsButton()}
					{this.renderPopulateGamesButton()}
					<Profile
						currentPage={'/admin'}
					/>
				</Navbar>
				<div className={`${className}__Content`}>
					<LeagueAdmin/>
					<PlayerTeamAdmin />
				</div>
			</div>
		);
	}
}

export default AdminDashboard;
