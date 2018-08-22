import Requests from "../../Common/Util/Requests";

export default class AdminApi {

	static populateGames() {
		return Requests.put(`/admin/games`);
	}

}