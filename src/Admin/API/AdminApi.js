import Requests from "../../Common/Util/Requests";

export default class AdminApi {

	static populateGames() {
		return Requests.put('/admin/games');
	}

	static populateTeams() {
		return Requests.put('/admin/nfl_teams');
	}

	static populateStadiums() {
		return Requests.put('/admin/stadiums');
	}

	static advanceWeek() {
		return Requests.put('/admin/advance_week');
	}

}