import { createSelector } from 'reselect';

const gamesDataSelector = state => state.league;
const defaultGames = {};

const gamesSelector = createSelector(
	[gamesDataSelector],
	gamesData => {
		return gamesData || defaultGames;
	}
);

export default gamesSelector;
