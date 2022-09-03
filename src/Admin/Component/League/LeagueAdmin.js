import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Card,  Form, Label, Dropdown } from 'semantic-ui-react'
import { withToastManager } from "react-toast-notifications";

import LeagueDecorator from "../../../League/Decorator/LeagueDecorator";

const className = "LeagueAdmin";

const actions = [
	{
		key: 'create',
		value: 'create',
		text: 'Create',
	},
	{
		key: 'update',
		value: 'update',
		text: 'Update',
	},
];

@withToastManager
@LeagueDecorator
class LeagueAdmin extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
			action: '',
			leagueId: null,
			leagueLoading: false,
			name: '',
			price: '',
			description: '',
		}
	}

	componentDidMount() {
		if(!this.props.leagues.data) {
			this.props.getAllLeagues();
		}
	}

	handleChange(e, { name, value }) {
		this.setState({[name]: value})
	}

	handleActionChange(e, { value }) {
		this.setState({
			action: value,
			name: '',
			price: '',
			description: '',
		});
	}

	handleSubmit() {
		this.setState({
			leagueLoading: true,
		});

		let submit = () => {};
		const league = {
			name: this.state.name,
			description: this.state.description,
			price: this.state.price,
		};

		switch(this.state.action) {
			case 'create':
				submit = this.props.createLeague;
				break;
			case 'update':
				submit = this.props.updateLeague;
				league.id = this.state.id;
				break;
			default:
				console.log('How did you get here?', this.state.action);
				break;
		}

		submit(league).then(this.onSubmitSuccess).catch(this.onSubmitFailure);
	}

	handleLeagueSelection(e, { value }) {
		const leagueInfo = this.props.leagues.data.leagues.find(league => league.id === value);
		this.setState({
			id: leagueInfo.id,
			name: leagueInfo.name,
			description: leagueInfo.description,
			price: leagueInfo.price,
		});
	}

	onSubmitSuccess() {
		const props = this.props;
		this.setState({
			leagueLoading: false,
		});
		props.getAllLeagues();
		props.toastManager.add(`Success`, { appearance: 'success', autoDismiss: true });
	}

	onSubmitFailure(error) {
		const message = `${error.status} : ${error.message}`;
		this.setState({
			leagueLoading: false,
		});
		this.props.toastManager.add(message, { appearance: 'error', autoDismiss: true});
	}

	static formatLeagues(leagues) {
		return leagues.length ? leagues.map(league => {
			return {
				key: league.id,
				value: league.id,
				text: league.name,
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

	renderLeaguesDropdown() {
		const leagues = (this.props.leagues.data && this.props.leagues.data.leagues) || [];
		return (
			<Form.Dropdown
				deburr
				fluid
				options={LeagueAdmin.formatLeagues(leagues)}
				placeholder='Select a League'
				search
				selection
				onChange={this.handleLeagueSelection}
			/>
		);
	}

	renderCreateLeague(action) {
		return action === 'create' ? (
			<React.Fragment>
				<Card.Content description='Create League' />
				<Form
					loading={this.state.leagueLoading}
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
							name={'price'}
							value={this.state.price}
							onChange={this.handleChange}
							labelPosition='right'
						>
							<Label basic>$</Label>
							<input />
							<Label/>
						</Form.Input>
					</Form.Group>
					<Form.TextArea
						required
						label='League Description'
						placeholder='Description'
						name={'leagueDescription'}
						value={this.state.leagueDescription}
						onChange={this.handleChange}
					/>
					<Form.Button content={'Submit'}/>
				</Form>
			</React.Fragment>
		) : null;
	}

	renderUpdateLeague(action) {
		return action === 'update' ? (
			<React.Fragment>
				<Card.Content description='Update League' />
				<Form
					loading={this.state.leagueLoading}
					className={`${className}__Form`}
					onSubmit={this.handleSubmit}
				>
					{this.renderLeaguesDropdown()}
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
							name={'price'}
							value={this.state.price}
							onChange={this.handleChange}
							labelPosition='right'
						>
							<Label basic>$</Label>
							<input />
							<Label/>
						</Form.Input>
					</Form.Group>
					<Form.TextArea
						required
						label='League Description'
						placeholder='Description'
						name={'leagueDescription'}
						value={this.state.leagueDescription}
						onChange={this.handleChange}
					/>
					<Form.Button content={'Submit'}/>
				</Form>
			</React.Fragment>
		) : null;
	}

	renderLeagueCard() {
		const { action } = this.state;
		return (
			<Card
				color={"red"}
				className={`${className}__Card`}
				fluid
			>
				<Card.Content header='Leagues' />
				<Card.Content>
					{this.renderActionDropdown()}
				</Card.Content>
				{this.renderCreateLeague(action)}
				{this.renderUpdateLeague(action)}
			</Card>
		);
	}

	render() {
		return (
			<div className={`${className}__Section`}>
				{this.renderLeagueCard()}
			</div>
		);
	}
}

export default LeagueAdmin;
