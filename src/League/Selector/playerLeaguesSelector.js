import { createSelector } from 'reselect';

const playerLeaguesDataSelector = state => state.playerLeagues;
const defaultPlayerLeagues = {};

const playerLeaguesSelector = createSelector(
	[playerLeaguesDataSelector],
	playerLeaguesData => {
		return playerLeaguesData || defaultPlayerLeagues;
	}
);

export default playerLeaguesSelector;
