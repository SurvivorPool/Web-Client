import { createSelector } from 'reselect';

const leagueDataSelector = state => state.league.data;
const userDataSelector = state => state.user.data;

const defaultPlayerTeamFromLeague = [];

const playerTeamFromLeagueSelector = createSelector(
	[leagueDataSelector, userDataSelector],
	(leagueData, userData) => {
		if(!leagueData || !userData) {
			return defaultPlayerTeamFromLeague;
		}

		const playerTeams = leagueData.teams.filter(team => team.user_id === userData.id);
		return playerTeams.length ? playerTeams : defaultPlayerTeamFromLeague;
	}
);

export default playerTeamFromLeagueSelector;
