import Requests from "../../Common/Util/Requests";

export default class AdminApi {

	static populateGames() {
		return Requests.get('/games');
	}

	static populateTeams() {
		return Requests.get('/nfl_teams');
	}

	static populateStadiums() {
		return Requests.get('/stadiums');
	}

	static advanceWeek() {
		return Requests.put('/admin/advance_week');
	}

}
