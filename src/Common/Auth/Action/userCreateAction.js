import UserApi from "../API/UserApi";

import ActionCreator from "../../Util/ActionCreator";

export default ActionCreator({
	name: "USER_CREATE",
	action: UserApi.create.bind(UserApi),
});