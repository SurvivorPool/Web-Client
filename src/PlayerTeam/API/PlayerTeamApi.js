import Requests from "../../Common/Util/Requests";

export default class PlayerTeamApi {

	static create(team) {
		return Requests.post(`/player_teams`, team);
	}

	static update(team) {
		return Requests.put(`/player_teams/${team.id}`, team);
	}

	static get(teamId) {
		return Requests.get(`/player_teams/${teamId}`);
	}

	static delete(team) {
		return Requests.delete(`/player_teams`, team);
	}

	/* Admin */
	static adminUpdate(team) {
		return Requests.put(`/admin/player_teams/${team.id}`, team);
	}

	static adminDelete(team) {
		return Requests.delete(`/admin/player_teams/${team.id}`, team);
	}

	static adminGetAll() {
		return Requests.get('/admin/player_teams');
	}

}
