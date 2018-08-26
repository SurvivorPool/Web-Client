import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

import PrimaryButton from "../../Common/Button/PrimaryButton";
import SecondaryButton from "../../Common/Button/SecondaryButton";

const className = 'Game';
const awayClassName = `${className}__Away`;
const homeClassName = `${className}__Home`;
const vsClassName = `${className}__VS`;
const startedClassName = `${className}__Started`;
const timeClassName = `${className}__Time`;

class Game extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
			pick: null,
			isPicking: false,
		}
	}

	handleTeamClick(team) {
		const { game, playerTeam } = this.props;
		const canPick = !game.hasStarted;

		if(canPick) {
			const pick = {
				team_id: playerTeam.team_id,
				nfl_team_name: team.nickName,
				game_id: game.game_id,
			};

			this.setState({
				pick,
				isPicking: true,
			});
		}
	}

	handlePickConfirmation(pick) {
		this.props.handlePick(pick);
		this.resetPick();
	}

	handlePickCancel() {
		this.resetPick();
	}

	resetPick() {
		this.setState({
			pick: null,
			isPicking: false,
		});
	}

	static renderSide(side, game, state, handlers) {
		const { isPicking, pick } = state;
		const sideClassName = side === 'away' ? awayClassName : homeClassName;
		const team = game[side];
		const isPickingTeam = isPicking && pick.nfl_team_name === team.nickName;

		return !isPickingTeam ? (
			<div
				className={sideClassName}
				style={{ 'backgroundColor': `#${team.color}`}}
				onClick={() => handlers.handleTeamClick(team)}
			>
				<div
					className={`${sideClassName}__Polygon`}
					style={{ 'backgroundColor': `#${team.color}`}}
				/>
				<div className={`${className}__Info`}>
					<div className={`${className}__Info__Container ${sideClassName}__Info`}>
						<img
							src={team.logoPath}
							alt={`${team.displayName} logo`}
							className={`${className}__Logo`}
						/>
					</div>
					<div className={`${className}__Info__Buttons`} />
				</div>
			</div>
		) : Game.renderPickConfirmation(side, pick, team, sideClassName, handlers);
	}

	static renderScore(game) {
		return game ? (
			<div
				className={`${className}__Score`}
			>
				{`${game.away.score} - ${game.home.score}`}
			</div>
		) : null;
	}

	static renderStatus(game) {
		const gameOver = game.hasStarted && game.quarter === 'F';

		if(gameOver) {
			return (
				<div className={timeClassName}>
					{"Final"}
				</div>
			);
		}

		return game.hasStarted ? (
			<div className={timeClassName}>
				{`${game.quarter} - ${game.quarter_time}`}
			</div>
		) : (
			<div className={timeClassName}>
				{"Pregame"}
			</div>
		);
	}

	static renderMiddle(game) {
		return (
			<div className={`${vsClassName}__Container`}>
				<div className={vsClassName}>
					{"VS."}
				</div>
				{Game.renderScore(game)}
				{Game.renderStatus(game)}
			</div>
		);
	}

	static renderPickConfirmation(side, pick, team, sideClassName, handlers) {
		const sideButtonsClassName = side === 'away' ? `${className}__Info__Buttons__Away` : `${className}__Info__Buttons__Home`;

		return (
			<div
				className={sideClassName}
				style={{ 'backgroundColor': `#${team.color}`}}
			>
				<div
					className={`${sideClassName}__Polygon`}
					style={{ 'backgroundColor': `#${team.color}`}}
				/>
				<div className={`${className}__Info`}>
					<div className={`${className}__Info__Container ${sideClassName}__Info`}>
						<img
							src={team.logoPath}
							alt={`${team.displayName} logo`}
							className={`${className}__Logo`}
						/>
					</div>
					<div
						className={`${className}__Info__Buttons ${sideButtonsClassName}`}
					>
						<span
							className={`${className}__Info__Buttons__Confirm`}
						>
							{`Pick the ${team.nickName}?`}
						</span>
						<div
							className={`${className}__Info__Buttons__Container`}
						>
							<PrimaryButton
								onClick={() => handlers.handlePickConfirmation(pick)}
							>
								{"Confirm"}
							</PrimaryButton>
							<SecondaryButton
								onClick={handlers.handlePickCancel}
							>
								{"Cancel"}
							</SecondaryButton>
						</div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		const { game } = this.props;
		const statusClassName = game.hasStarted ? startedClassName : '';
		const handlers = {
			handleTeamClick: this.handleTeamClick,
			handlePickConfirmation: this.handlePickConfirmation,
			handlePickCancel: this.handlePickCancel,
		};

		return (
			<div
				className={`${className}__Container ${statusClassName}`}
			>
				{Game.renderSide('away', game, this.state, handlers)}
				{Game.renderMiddle(game)}
				{Game.renderSide('home', game, this.state, handlers)}
			</div>
		);
	}
}

Game.propTypes = {
	game: PropTypes.object.isRequired,
	playerTeam: PropTypes.object.isRequired,
	handlePick: PropTypes.func.isRequired,
};

export default Game;
