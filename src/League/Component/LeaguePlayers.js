import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Image, Segment, Label, Input } from 'semantic-ui-react';
import { List, AutoSizer } from 'react-virtualized';
import PropTypes from 'prop-types';

import { getLogoPath } from "../../Games/Util/teamConfig";

const className = 'LeaguePlayers';
const teamClassName = `${className}__Team`;

class LeaguePlayers extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	rowRender({ key, index, style }) {
		const team = this.props.players[index];
		const rowClassName = team.is_active ? teamClassName : `${teamClassName} ${teamClassName}__Sunk`;
		const hasPick = !!team.current_pick;

		return (
			<div
				key={key}
				style={style}
				className={rowClassName}
			>
				{hasPick ? LeaguePlayers.renderPick(team) : LeaguePlayers.renderPlayerAvatar(team)}
				{LeaguePlayers.renderTeamName(team)}
				{LeaguePlayers.renderPlayerName(team)}
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

	static renderPick(team) {
		const teamName = team.current_pick === '49ers' ? 'niners' : team.current_pick.toLowerCase();
		const logoPath = getLogoPath(teamName);

		return (
			<div
				className={`${teamClassName}__Pick`}
			>
				<Image
					alt={`${teamName} logo`}
					src={logoPath}
				/>
			</div>
		)
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
							rowHeight={75}
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
