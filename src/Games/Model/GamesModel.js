import { getTeamConfig } from "../Util/teamConfig";

export default function GamesModel(data) {
	const formattedGames = data.games.map(game => formatGame(game));
	return {
		games: formattedGames,
	}
}

function formatGame(game) {
	return {
		day: game.day_of_week,
		game_date: game.game_date,
		quarter: game.quarter,
		quarter_time: game.quarter_time,
		stadium_info: game.stadium_info,
		time: game.time,
		week: game.week,
		game_id: game.game_id,
		hasStarted: game.quarter !== 'P',
		...getTeamConfig(game, 'away'),
		...getTeamConfig(game, 'home'),
	}
}