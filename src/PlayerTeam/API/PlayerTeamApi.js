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

}