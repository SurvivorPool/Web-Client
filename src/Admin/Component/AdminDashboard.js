import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { withToastManager } from "react-toast-notifications";

import Navbar from "../../Navbar/Component/Navbar";
import Profile from "../../Profile/Component/Profile";
import LeagueAdmin from "./League/LeagueAdmin";
import PrimaryButton from "../../Common/Button/PrimaryButton";

import AdminDecorator from "../Decorator/AdminDecorator";
import AdminActionsDecorator from "../Decorator/AdminActionsDecorator";
import AuthDecorator from "../../Common/Auth/Component/AuthDecorator";

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
			.then(this.onPopulateGamesSuccess)
			.catch(this.onPopulateGamesFailure);
	}

	onPopulateGamesSuccess() {
		const { toastManager } = this.props;
		toastManager.add('Populated Games Successfully', { appearance: 'success', autoDismiss: true });
	}

	onPopulateGamesFailure() {
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

	render() {
		return (
			<div className={className}>
				<Navbar>
					{this.renderPopulateGamesButton()}
					<Profile
						currentPage={'/admin'}
					/>
				</Navbar>
				<div className={`${className}__Content`}>
					<LeagueAdmin/>
				</div>
			</div>
		);
	}
}

export default AdminDashboard;
