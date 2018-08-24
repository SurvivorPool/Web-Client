import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import {Card, Form, Icon, Image} from 'semantic-ui-react';
import { withToastManager } from "react-toast-notifications";

import PrimaryButton from "../../Common/Button/PrimaryButton";
import SecondaryButton from "../../Common/Button/SecondaryButton";

const className = 'Game';
const awayClassName = `${className}__Away`;
const homeClassName = `${className}__Home`;
const vsClassName = `${className}__VS`;

@withToastManager
class Game extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
		}
	}

	static renderSide(side, game) {
		const sideClassName = side === 'away' ? awayClassName : homeClassName;
		const team = game[side];

		return (
			<div
				className={sideClassName}
				style={{ 'backgroundColor': `#${team.color}`}}
			>
				<div
					className={`${sideClassName}__Polygon`}
					style={{ 'backgroundColor': `#${team.color}`}}
				/>
				<div className={`${className}__Info__Container ${sideClassName}__Info`}>
					<img
						src={team.logoPath}
						alt={`${team.displayName} logo`}
						className={`${className}__Logo`}
					/>
				</div>
			</div>
		);
	}

	static renderScore(game) {
		// hasStarted
		return game ? (
			<div
				className={`${className}__Score`}
			>
				{`${game.away.score} - ${game.home.score}`}
			</div>
		) : null;
	}


	render() {
		const { game } = this.props;

		return (
			<div className={`${className}__Container`}>
				{Game.renderSide('away', game)}
				<div className={`${vsClassName}__Container`}>
					<div className={vsClassName}>
						{"VS."}
					</div>
					{Game.renderScore(game)}
				</div>
				{Game.renderSide('home', game)}
			</div>
		);
	}
}

Game.defaultProps = {

};

Game.propTypes = {
	game: PropTypes.object.isRequired,
};

export default Game;
