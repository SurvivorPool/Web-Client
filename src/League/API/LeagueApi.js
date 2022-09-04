import Requests from "../../Common/Util/Requests";

export default class LeagueApi {

	static create(league) {
		return Requests.post(`/admin/leagues`, league);
	}

	static update(league) {
		return Requests.put(`/admin/leagues`, league);
	}

	static get(leagueId) {
		return Requests.get(`/leagues/${leagueId}`);
	}

	static getByUser(user) {
		return Requests.get(`/leagues/user/${user.id}`);
	}

	static getAllLeagues() {
		return Requests.get('/leagues');
	}
}
