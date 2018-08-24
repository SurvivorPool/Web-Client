import { getTeamConfig } from "../Util/teamConfig";

export default function GamesModel(data) {
	const formattedGames = data.games.map(game => formatGame(game)).sort((a, b) => a.game_id - b.game_id);
	return {
		games: formattedGames,
	}
}

function formatGame(game) {
	return {
		day: game.day_of_week,
		game_date: game.game_date,
		quarter: game.quarter,
		time: game.time,
		week: game.week,
		game_id: game.game_id,
		...getTeamConfig(game, 'away'),
		...getTeamConfig(game, 'home'),
	}
}