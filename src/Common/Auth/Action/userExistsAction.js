import UserApi from "../API/UserApi";

import ActionCreator from "../../Util/ActionCreator";

export default ActionCreator({
	name: "USER_EXISTS",
	action: UserApi.exists.bind(UserApi),
});