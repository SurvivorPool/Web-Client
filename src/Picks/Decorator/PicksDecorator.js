import React, { Component } from 'react';
import { connect } from 'react-redux';

import createPickAction from "../Action/createPickAction";
import clearPickAction from "../Action/clearPickAction";

export default function(DecoratedComponent) {
	@connect(
		state => ({
			pick: state.pick,
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

