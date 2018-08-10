import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Container, Card,  Form, Message } from 'semantic-ui-react'

import Navbar from "../../Navbar/Component/Navbar";
import Profile from "../../Profile/Component/Profile";

import AdminDecorator from "../Decorator/AdminDecorator";
import LeagueDecorator from "../../League/Decorator/LeagueDecorator";

const className = "AdminDashboard";

@LeagueDecorator
@AdminDecorator
class AdminDashboard extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
			// either separate into different components or create a model
			leagueLoading: false,
			leagueSuccess: '',
			leagueError: '',
			leagueName: '',
			leaguePrice: '',
			leagueDescription: '',
		}
	}

	componentDidMount() {

	}

	handleDismiss(message) {
		this.setState({
			[message] : '',
		});
	}

	handleChange(e, { name, value }) {
		this.setState({[name]: value})
	}

	handleSubmit() {
		this.setState({
			leagueLoading: true,
		});

		this.props.createLeague({
			league_name: this.state.leagueName,
			league_description: this.state.leagueDescription,
			price: this.state.leaguePrice,
		}).then(this.onSubmitSuccess).catch(this.onSubmitFailure);
	}

	onSubmitSuccess(response) {
		this.setState({
			leagueLoading: false,
			leagueSuccess: response,
		});
	}

	onSubmitFailure(error) {
		const message = `${error.status} : ${error.message}`;
		this.setState({
			leagueLoading: false,
			leagueError: message,
		});
	}

	renderError(error) {
		return error ? (
			<Message
				error
				header='Failed'
				content={`${error}`}
				onDismiss={() => this.handleDismiss('leagueError')}
			/>
		) : null;
	}

	renderSuccess(success) {
		return success ? (
			<Message
				success
				header='Success'
				content={`${AdminDashboard.formatSuccessObject(success)}`}
				onDismiss={() => this.handleDismiss('leagueSuccess')}
			/>
		) : null;
	}

	static formatSuccessObject(success) {
		return Object.keys(success).reduce((output, key) => {
			output.push(`${key} : ${success[key]}`);
			return output
		}, []).join(', ');
	}

	renderCreateLeague() {
		return (
			<React.Fragment>
				<Card.Content description='Create League' />
				<Form
					loading={this.state.leagueLoading}
					success={!!this.state.leagueSuccess}
					error={!!this.state.leagueError}
					className={`${className}__Form`}
					onSubmit={this.handleSubmit}
				>
					<Form.Group widths={'equal'}>
						<Form.Input
							fluid
							required
							label='League Name'
							placeholder='League'
							name={'leagueName'}
							value={this.state.leagueName}
							onChange={this.handleChange}
						/>
						<Form.Input
							fluid
							required
							label='League Price'
							placeholder='Price'
							name={'leaguePrice'}
							value={this.state.leaguePrice}
							onChange={this.handleChange}
						/>
					</Form.Group>
					<Form.TextArea
						required
						label='League Description'
						placeholder='Description'
						name={'leagueDescription'}
						value={this.state.leagueDescription}
						onChange={this.handleChange}
					/>
					{this.renderSuccess(this.state.leagueSuccess)}
					{this.renderError(this.state.leagueError)}
					<Form.Button content={'Submit'}/>
				</Form>
			</React.Fragment>
		);
	}

	renderLeagueCard() {
		return (
			<Card
				color={"red"}
				className={`${className}__Card`}
				fluid
			>
				<Card.Content header='Leagues' />
				{this.renderCreateLeague()}
			</Card>
		);
	}

	render() {
		return (
			<div className={className}>
				<Navbar>
					<Profile
						onLogoutClick={this.props.logout}
						redirectLink={"/dashboard"}
						redirectLabel={"Dashboard"}
					/>
				</Navbar>
				<div className={`${className}__Content`}>
					<Container className={`${className}__Section`}>
						{this.renderLeagueCard()}
					</Container>
				</div>
			</div>
		);
	}
}

export default AdminDashboard;
