import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Container, Card,  Form, Message, Label, Dropdown } from 'semantic-ui-react'

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
			leagueSuccess: '',
			leagueError: '',
			leagueName: '',
			leaguePrice: '',
			leagueDescription: '',
		}
	}

	componentDidMount() {
		if(this.props.leagues.data && !this.props.leagues.data.leagues) {
			this.props.getAllLeagues();
		}
	}

	handleDismiss(message) {
		this.setState({
			[message] : '',
		});
	}

	handleChange(e, { name, value }) {
		this.setState({[name]: value})
	}

	handleActionChange(e, { value }) {
		this.setState({
			action: value,
			leagueSuccess: '',
			leagueError: '',
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

	onSubmitSuccess(response) {
		this.setState({
			leagueLoading: false,
			leagueSuccess: response,
		}, this.props.getAllLeagues);
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
				content={`${LeagueAdmin.formatSuccessObject(success)}`}
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
					{this.renderSuccess(this.state.leagueSuccess)}
					{this.renderError(this.state.leagueError)}
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
					success={!!this.state.leagueSuccess}
					error={!!this.state.leagueError}
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
					{this.renderSuccess(this.state.leagueSuccess)}
					{this.renderError(this.state.leagueError)}
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
