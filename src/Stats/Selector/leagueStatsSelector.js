import { createSelector } from 'reselect';

const statsDataSelector = state => state.stats.data;
const defaultStats = {};

const leagueStatsSelector = createSelector(
	[statsDataSelector],
	leagueStatsData => {
		return leagueStatsData || defaultStats;
	}
);

export default leagueStatsSelector;
