import { createSelector } from 'reselect';

const leaguesDataSelector = state => state.leagues;
const defaultLeagues = {};

const leaguesSelector = createSelector(
	[leaguesDataSelector],
	leaguesData => {
		return leaguesData || defaultLeagues;
	}
);

export default leaguesSelector;
