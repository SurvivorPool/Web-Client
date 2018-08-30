import Requests from "../../Common/Util/Requests";

export default class PlayerTeamApi {

	static create(team) {
		return Requests.put(`/player_team`, team);
	}

	static update(team) {
		return Requests.put(`/player_team`, team);
	}

	static get(teamId) {
		return Requests.get(`/player_team/${teamId}`);
	}

	static delete(team) {
		return Requests.delete(`/player_team`, team);
	}

	/* Admin */
	static adminUpdate(team) {
		return Requests.put('/admin/player_team', team);
	}

	static adminDelete(team) {
		return Requests.delete('/admin/player_team', team);
	}

	static adminGetAll() {
		return Requests.get('/admin/player_teams');
	}

}