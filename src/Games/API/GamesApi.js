import Requests from "../../Common/Util/Requests";

import GamesModel from "../Model/GamesModel";

export default class GamesApi {

	static get() {
		return Requests.get('/games/').then(GamesModel);
	}

}