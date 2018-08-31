import MessagesApi from "../API/MessagesApi";

import ActionCreator from "../../Common/Util/ActionCreator";

export default ActionCreator({
	name: "ADMIN_MESSAGE_UPDATE",
	action: MessagesApi.update.bind(MessagesApi),
});