import UserApi from "../API/UserApi";

import ActionCreator from "../../Util/ActionCreator";

export default ActionCreator({
	name: "USER_GET_INITIAL",
	action: UserApi.get.bind(UserApi),
});