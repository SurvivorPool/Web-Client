import { createSelector } from 'reselect';

const leagueSelector = state => state.league.data;
const userSelector = state => state.user.data;

const defaultLeaguePlayers = [];

const leaguePlayers = createSelector(
	[leagueSelector, userSelector],
	(leagueData, userData) => {
		return leagueData && leagueData.teams && leagueData.teams.length ?
			leagueData.teams.filter(team => team.user_id !== userData.id)
			: defaultLeaguePlayers;
	}
);

export default leaguePlayers;
