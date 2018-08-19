import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Container, Card,  Form, Label, Dropdown } from 'semantic-ui-react'
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
	{
		key: 'delete',
		value: 'delete',
		text: 'Delete'
	},
];

@withToastManager
@LeagueDecorator
class LeagueAdmin extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
			// either separate into different components or create a model
			action: '',
			leagueId: null,
			leagueLoading: false,
			leagueName: '',
			leaguePrice: '',
			leagueDescription: '',
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
			leagueName: '',
			leaguePrice: '',
			leagueDescription: '',
		});
	}

	handleSubmit() {
		this.setState({
			leagueLoading: true,
		});

		let submit = () => {};
		const league = {
			league_name: this.state.leagueName,
			league_description: this.state.leagueDescription,
			price: this.state.leaguePrice,
		};

		switch(this.state.action) {
			case 'create':
				submit = this.props.createLeague;
				break;
			case 'update':
				submit = this.props.updateLeague;
				league.league_id = this.state.leagueId;
				break;
			case 'delete':
				//submit = this.props.deleteLeague;
				//league.league_id = this.state.leagueId;
				break;
			default:
				console.log('How did you get here?', this.state.action);
				break;
		}

		submit(league).then(this.onSubmitSuccess).catch(this.onSubmitFailure);
	}

	handleLeagueSelection(e, { value }) {
		const leagueInfo = this.props.leagues.data.leagues.find(league => league.league_id === value);
		this.setState({
			leagueId: leagueInfo.league_id,
			leagueName: leagueInfo.league_name,
			leagueDescription: leagueInfo.league_description,
			leaguePrice: leagueInfo.price,
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
				key: league.league_id,
				value: league.league_id,
				text: league.league_name,
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
							name={'leaguePrice'}
							value={this.state.leaguePrice}
							onChange={this.handleChange}
							labelPosition='right'
						>
							<Label basic>$</Label>
							<input />
							<Label>.00</Label>
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
							name={'leaguePrice'}
							value={this.state.leaguePrice}
							onChange={this.handleChange}
							labelPosition='right'
						>
							<Label basic>$</Label>
							<input />
							<Label>.00</Label>
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
			<Container className={`${className}__Section`}>
				{this.renderLeagueCard()}
			</Container>
		);
	}
}

export default LeagueAdmin;
