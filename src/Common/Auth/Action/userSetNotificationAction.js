import UserApi from "../API/UserApi";

import ActionCreator from "../../Util/ActionCreator";

export default ActionCreator({
	name: "USER_SET_NOTIFICATION",
	action: UserApi.setNotification.bind(UserApi),
});