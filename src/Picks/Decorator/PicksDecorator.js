import React, { Component } from 'react';
import { connect } from 'react-redux';

import createPickAction from "../Action/createPickAction";
import clearPickAction from "../Action/clearPickAction";

import pickedGameSelector from "../Selector/pickedGameSelector";

export default function(DecoratedComponent) {
	@connect(
		state => ({
			pick: state.pick,
			pickedGame: pickedGameSelector(state),
		}),
		dispatch => ({
			createPick: (pick) => dispatch(createPickAction(pick)),
			clearPick: () => dispatch(clearPickAction()),
		})
	)
	class LeagueDecorator extends Component {

		componentWillUnmount() {
			this.props.clearPick();
		}

		render() {
			return (
				<DecoratedComponent
					{...this.props}
				/>
			)
		}
	}

	return LeagueDecorator;
}

