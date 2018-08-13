import { createSelector } from 'reselect';

const leagueDataSelector = state => state.league;
const defaultLeague = {};

const leagueSelector = createSelector(
	[leagueDataSelector],
	leagueData => {
		return leagueData || defaultLeague;
	}
);

export default leagueSelector;
