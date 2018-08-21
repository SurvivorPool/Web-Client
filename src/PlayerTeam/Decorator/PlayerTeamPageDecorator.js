import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Redirect } from 'react-router-dom'

import getGamesAction from "../../Games/Action/getGamesAction";

import playerTeamSelector from "../Selector/playerTeamSelector";
import gamesSelector from "../../Games/Selector/gamesSelector";

export default function(DecoratedComponent) {
	@connect(
		state => ({
			playerTeam: playerTeamSelector(state),
			games: gamesSelector(state),
		}),
		dispatch => ({
			getGames: (week) => dispatch(getGamesAction(week)),
		})
	)
	class PlayerTeamPageDecorator extends Component {
		constructor(props) {
			super(props);
			autoBind(this);
			this.state = {
				shouldRedirect: false,
			};
		}

		componentDidMount() {
			const props = this.props;
			this.loadTeam().then(team => {
				if(team && team.user_info && team.user_info.user_id !== props.user.data.user_id ) {
					this.setState({
						shouldRedirect: true,
					});
				}
			});
		}

		loadTeam() {
			const props = this.props;
			const teamId = (props.match.params && props.match.params.team_id) || null;
			if(teamId) {
				return this.props.getPlayerTeam(teamId)
			}

			return Promise.Resolve();
		}

		render() {
			if(this.state.shouldRedirect) {
				return (
					<Redirect
						to={'/dashboard'}
					/>
				);
			}

			return (
				<DecoratedComponent
					{...this.props}
					loadTeam={this.loadTeam}
				/>
			)
		}
	}

	return PlayerTeamPageDecorator;
}

