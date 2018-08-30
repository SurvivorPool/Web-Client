import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Checkbox, Card, Container } from "semantic-ui-react";
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
			showButtons: false,
		}
	}


	handleButtonToggle() {
		this.setState(prevState => {
			return {
				showButtons: !prevState.showButtons,
			}
		});
	}

	populateGames() {
		this.props.populateGames()
			.then(this.onPopulateSucess)
			.catch(this.onPopulateFailure);
	}

	populateTeams() {
		Promise.all([
			this.props.populateTeams(),
			this.props.populateStadiums(),
		]).then(this.onPopulateSucess)
			.catch(this.onPopulateFailure);
	}

	advanceWeek() {
		this.props.advanceWeek()
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

	renderAdvanceWeekButton() {
		return (
			<PrimaryButton
				onClick={this.advanceWeek}
			>
				{"Advance Week"}
			</PrimaryButton>
		);
	}

	renderAdminButtons(showButtons) {
		return showButtons ? (
			<Card
				fluid
				color={'yellow'}
			>
				<Card.Content header={"Admin Actions"}/>
				<Card.Content>
					{this.renderPopulateTeamsButton()}
					{this.renderPopulateGamesButton()}
					{this.renderAdvanceWeekButton()}
				</Card.Content>
			</Card>
		) : null;
	}

	renderButtonToggle(showButtons) {
		const label = showButtons ? "Show Buttons" : "Hide Buttons";
		return (
			<Checkbox
				className={`${className}__Toggle`}
				slider
				onChange={this.handleButtonToggle}
				checked={showButtons}
				label={label}
			/>
		);
	}

	render() {
		const { showButtons } = this.state;
		return (
			<div className={className}>
				<Navbar>
					{this.renderButtonToggle(showButtons)}
					<Profile
						currentPage={'/admin'}
					/>
				</Navbar>
				<div className={`${className}__Content`}>
					<Container>
					{this.renderAdminButtons(showButtons)}
						<LeagueAdmin/>
						<PlayerTeamAdmin
							adminDeletePlayerTeam={this.props.deletePlayerTeam}
							adminUpdatePlayerTeam={this.props.updatePlayerTeam}
						/>
					</Container>
				</div>
			</div>
		);
	}
}

export default AdminDashboard;
