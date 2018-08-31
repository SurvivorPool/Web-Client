import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Image, Segment, Label, Input } from 'semantic-ui-react';
import { List, AutoSizer } from 'react-virtualized';
import PropTypes from 'prop-types';

const className = 'LeaguePlayers';
const teamClassName = `${className}__Team`;

class LeaguePlayers extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	rowRender({ key, index, style }) {
		const team = this.props.players[index];
		return (
			<div
				key={key}
				style={style}
				className={teamClassName}
			>
				{LeaguePlayers.renderPlayerAvatar(team)}
				{LeaguePlayers.renderTeamName(team)}
				{LeaguePlayers.renderPlayerName(team)}
				{LeaguePlayers.renderTeamStatus(team)}
			</div>
		);
	}

	static renderPlayerAvatar(team) {
		return (
			<div
				className={`${teamClassName}__Avatar`}
			>
				<Image
					circular
					size='mini'
					src={team.user_info.picture_url}
				/>
			</div>
		);
	}

	static renderTeamName(team) {
		return (
			<div
				className={`${teamClassName}__Name`}
			>
				{team.team_name}
			</div>
		);
	}

	static renderPlayerName(team) {
		return (
			<div>
				{team.user_info.full_name}
			</div>
		);
	}

	static renderTeamStatus(team) {
		const status = team.is_active ? 'Active' : 'Sunk';
		const statusColor = status === 'Active' ? 'green' : 'red';
		return (
			<Label
				color={statusColor}
				horizontal
				size={'small'}
			>
				{status}
			</Label>
		)
	}

	static noRowsRender() {
		return (
			<div>{"No Teams Found."}</div>
		);
	}

	renderTeamsList(props) {
		return props.playersCount > 0 ? (
			<React.Fragment>
				<Input
					placeholder='Search Teams...'
					fluid
					onChange={props.handleSearch}
					className={`${className}__Search`}
				/>
				<AutoSizer>
					{({height, width}) => (
						<List
							width={width}
							height={height}
							rowCount={props.players.length}
							rowHeight={50}
							rowRenderer={this.rowRender}
							noRowsRenderer={LeaguePlayers.noRowsRender}
							overscanRowCount={20}
						/>
					)}
				</AutoSizer>
			</React.Fragment>
		) : (
			<span>{"This league is lonely ☹️"}</span>
		);
	}


	render() {
		const props = this.props;

		return (
			<Segment
				raised
			>
				<Label
					color='yellow'
					ribbon
				>
					{'League Teams'}
				</Label>
				<div
					className={className}
				>
					{this.renderTeamsList(props)}
				</div>
			</Segment>
		);
	}
}

LeaguePlayers.propTypes = {
	players: PropTypes.array.isRequired,
	handleSearch: PropTypes.func.isRequired,
	playersCount: PropTypes.number.isRequired,
};

export default LeaguePlayers;
