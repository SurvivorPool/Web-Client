import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import {Card, Form, Icon, Image} from 'semantic-ui-react';
import { withToastManager } from "react-toast-notifications";

import PrimaryButton from "../../Common/Button/PrimaryButton";
import SecondaryButton from "../../Common/Button/SecondaryButton";

const className = 'Game';

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

		return (
			<div>
				<div>
					{game.away_team_name}
				</div>
				<div>
					{game.home_team_name}
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
