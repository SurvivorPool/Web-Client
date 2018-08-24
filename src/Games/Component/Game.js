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

@withToastManager
class Game extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
		}
	}


	render() {
		const { game } = this.props;
		console.log(game, 'game');
		//const awayConfig = getTeamConfig(team);

		return (
			<div className={`${className}__Container`}>
				<div
					className={awayClassName}
					style={{ 'backgroundColor': `#${game.away.color}`}}
				>
					<div
						className={`${awayClassName}__Polygon`}
						style={{ 'backgroundColor': `#${game.away.color}`}}
					/>
					<div>{game.away.displayName}</div>
				</div>
				<div className={`${className}__AT`}>
					{"AT"}
				</div>
				<div
					className={homeClassName}
					style={{ 'backgroundColor': `#${game.home.color}`}}
				>
					<div
						className={`${homeClassName}__Polygon`}
						style={{ 'backgroundColor': `#${game.home.color}`}}
					/>
					<div>{game.home.displayName}</div>
				</div>
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
