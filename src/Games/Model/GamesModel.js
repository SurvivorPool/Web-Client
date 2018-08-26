import { getTeamConfig } from "../Util/teamConfig";

export default function GamesModel(data) {
	console.log(data, 'data');
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
		time: game.time,
		week: game.week,
		game_id: game.game_id,
		...getTeamConfig(game, 'away'),
		...getTeamConfig(game, 'home'),
	}
}