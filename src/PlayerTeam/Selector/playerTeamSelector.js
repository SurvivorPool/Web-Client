import { createSelector } from 'reselect';

const playerTeamDataSelector = state => state.playerTeam;
const defaultPlayerTeam = {};

const playerTeamSelector = createSelector(
	[playerTeamDataSelector],
	playerTeamData => {
		return playerTeamData || defaultPlayerTeam;
	}
);

export default playerTeamSelector;
