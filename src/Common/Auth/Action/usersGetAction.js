import UserApi from "../API/UserApi";

import ActionCreator from "../../Util/ActionCreator";

export default ActionCreator({
	name: "ADMIN_USERS_GET",
	action: UserApi.getAll.bind(UserApi),
});