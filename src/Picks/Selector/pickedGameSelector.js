import { createSelector } from 'reselect';

const gamesDataSelector = state => state.games.data;
const playerTeamDataSelector = state => state.playerTeam.data;

const defaultPickedGame = {};

const pickedGameSelector = createSelector(
	[gamesDataSelector, playerTeamDataSelector],
	(gamesData, playerTeamData) => {
		if(
			(gamesData && gamesData.games.length)
			&& (playerTeamData && playerTeamData.current_pick.length)
		) {
			const currentPick = playerTeamData.current_pick[0];
			const pickGame = gamesData.games.find(game => game.away.nickName === currentPick || game.home.nickName === currentPick);

			return pickGame ? { ...pickGame, playerPick: currentPick } :defaultPickedGame;
		}

		return defaultPickedGame;
	}
);

export default pickedGameSelector;
