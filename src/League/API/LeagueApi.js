import Requests from "../../Common/Util/Requests";

export default class LeagueApi {

	static create(league) {
		return Requests.put(`/league`, league);
	}

	static update(league) {
		return Requests.put(`/league`, league);
	}

	static get(leagueId) {
		return Requests.get(`/league/${leagueId}`);
	}

	static getByUser(user) {
		return Requests.get(`/leagues/user/${user.user_id}`);
	}

	static getAllLeagues() {
		return Requests.get('/leagues');
	}
}