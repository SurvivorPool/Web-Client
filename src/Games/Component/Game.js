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
const pickedClassName = `${className}__Picked`;

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
		const { game, playerTeam, pickedGame, pickHistory } = this.props;
		const canPick = Game.canBePicked(team, game, playerTeam, pickedGame, pickHistory);

		if(canPick) {
			const pick = {
				player_team_id: playerTeam.id,
				nfl_team_name: team.nickName,
				game_id: game.id,
			};

			this.setState({
				pick,
				isPicking: true,
			});
		}
	}

	static canBePicked(team, game, playerTeam, pickedGame, pickHistory) {
		return !game.hasStarted
			&& playerTeam.active
			&& !pickedGame.hasStarted
			&& pickedGame.playerPick !== team.nickName
			&& !pickHistory.includes(team.nickName);
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

	static renderSide(side, state, props, handlers) {
		const { isPicking, pick } = state;
		const { pickedGame, game, pickHistory, playerTeam } = props;

		const sideClassName = side === 'away' ? awayClassName : homeClassName;
		const team = game[side];
		const isPickingTeam = isPicking && pick.nfl_team_name === team.nickName;
		const hasPickedGame = pickedGame && pickedGame.id === game.id;
		const sidePicked = hasPickedGame ? pickedGame.playerPick === team.nickName : false;
		const teamHasBeenPicked = pickHistory.includes(team.nickName);
		const canPick = Game.canBePicked(team, game, playerTeam, pickedGame, pickHistory);

		return !isPickingTeam ? (
			<div
				className={`${sideClassName} ${canPick ? `${className}__Pickable` : `${className}__Disabled` }`}
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
					{Game.renderCurrentPick(sidePicked, side)}
					{Game.renderPastPick(teamHasBeenPicked, side)}
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

	static renderPastPick(teamHasBeenPicked, side) {
		const floatClassName = side === 'away' ? `${pickedClassName}__Away` : `${pickedClassName}__Home`;
		return teamHasBeenPicked ? (
			<div
				className={`${pickedClassName} ${floatClassName}`}
			>
				{"PREVIOUS PICK"}
			</div>
		) : null;
	}

	static renderCurrentPick(sidePicked, side) {
		const floatClassName = side === 'away' ? `${pickedClassName}__Away` : `${pickedClassName}__Home`;
		return sidePicked ? (
			<div
				className={`${pickedClassName} ${floatClassName}`}
			>
				{"PICKED"}
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

	static renderGameDate(game) {
        const game_date = new Date(game.game_date)
		return (
			<div className={`${className}__Date`}>
				<div>{game.day}</div>
				<div>{game_date.toLocaleDateString()} {game_date.toLocaleTimeString()}</div>
			</div>
		);
	}

	static renderMiddle(game) {
		return (
			<div className={`${vsClassName}__Container`}>
				{Game.renderGameDate(game)}
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
				{Game.renderSide('away', this.state, this.props, handlers)}
				{Game.renderMiddle(game)}
				{Game.renderSide('home', this.state, this.props, handlers)}
			</div>
		);
	}
}

Game.defaultProps = {
	pickedGame: {},
	pickHistory: [],
};

Game.propTypes = {
	game: PropTypes.object.isRequired,
	playerTeam: PropTypes.object.isRequired,
	handlePick: PropTypes.func.isRequired,
	pickedGame: PropTypes.object,
	pickHistory: PropTypes.array,
};

export default Game;
