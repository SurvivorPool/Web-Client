import Requests from "../../Common/Util/Requests";

import GamesModel from "../Model/GamesModel";

export default class GamesApi {

	static get(weekNum) {
		return Requests.get(`/games/${weekNum}`).then(GamesModel);
	}

}