import Requests from "../../Common/Util/Requests";

export default class StatsApi {

	static get(leagueId) {
		return Requests.get(`/stats/${leagueId}`);
	}

}
