import Requests from "../../Common/Util/Requests";

export default class PicksApi {

	static create(pick) {
		return Requests.put(`/picks`, pick);
	}

}
