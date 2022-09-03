import { createSelector } from 'reselect';
import leagueSelector from './leagueSelector';
import userSelector from "../../Common/Auth/Selector/userSelector";

const canCreateTeamSelector = createSelector(
	[leagueSelector, userSelector],
	(leagueData, userData) => {
		return leagueData.data ? canCreateTeam(leagueData.data, userData.data) : false;
	}
);

function canCreateTeam(league, user)  {
	if(!league.signup_active) {
		return false;
	}

	if(league.league_type === 'FREE') {
		const leagueTeams = user.teams && user.teams.filter(team => team.league_id === league.id);
		return leagueTeams.length !== 1;
	}

	return true;
}

export default canCreateTeamSelector;
