import PicksApi from "../API/PicksApi";

import ActionCreator from "../../Common/Util/ActionCreator";

export default ActionCreator({
	name: "PICK_CREATE",
	action: PicksApi.create.bind(PicksApi),
});