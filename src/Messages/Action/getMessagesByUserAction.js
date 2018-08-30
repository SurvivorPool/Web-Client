import MessagesApi from "../API/MessagesApi";

import ActionCreator from "../../Common/Util/ActionCreator";

export default ActionCreator({
	name: "MESSAGES_GET",
	action: MessagesApi.getByUser.bind(MessagesApi),
});