import React, { Component } from 'react';
import { connect } from 'react-redux';

import populateGamesAction from "../Action/populateGamesAction";

export default function(DecoratedComponent) {
	@connect(
		state => ({
		}),
		dispatch => ({
			populateGames: () => dispatch(populateGamesAction()),
		}),
	)
	class AdminActionsDecorator extends Component {
		render() {
			return (
				<DecoratedComponent
					{...this.props}
				/>
			)
		}
	}

	return AdminActionsDecorator;
}

