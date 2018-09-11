import MessagesApi from "../API/MessagesApi";

import ActionCreator from "../../Common/Util/ActionCreator";

export default ActionCreator({
	name: "ADMIN_MESSAGE_MARK_READ",
	action: MessagesApi.markRead.bind(MessagesApi),
});