import MessagesApi from "../API/MessagesApi";

import ActionCreator from "../../Common/Util/ActionCreator";

export default ActionCreator({
	name: "ADMIN_MESSAGE_CREATE",
	action: MessagesApi.create.bind(MessagesApi),
});