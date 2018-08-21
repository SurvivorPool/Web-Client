import Requests from "../../Common/Util/Requests";

export default class GamesApi {

	static get(weekNum) {
		return Requests.get(`/games/${weekNum}`);
	}

}