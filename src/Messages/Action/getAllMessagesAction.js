import MessagesApi from "../API/MessagesApi";

import ActionCreator from "../../Common/Util/ActionCreator";

export default ActionCreator({
	name: "ADMIN_MESSAGES_GET",
	action: MessagesApi.get.bind(MessagesApi),
});