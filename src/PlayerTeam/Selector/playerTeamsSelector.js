import { createSelector } from 'reselect';

const playerTeamsDataSelector = state => state.playerTeams;
const defaultPlayerTeams = {};

const playerTeamsSelector = createSelector(
	[playerTeamsDataSelector],
	playerTeamsData => {
		return playerTeamsData || defaultPlayerTeams;
	}
);

export default playerTeamsSelector;
