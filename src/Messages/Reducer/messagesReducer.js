import getAllMessagesAction from "../Action/getAllMessagesAction";
import createMessageAction from "../Action/createMessageAction";
import getMessagesByUserAction from "../Action/getMessagesByUserAction";

export const initialState = {
	loading: false,
	data: null,
	error: null,
};

export default function messagesReducer(state = initialState, action) {
	switch (action.type) {
		case getAllMessagesAction.ACTION:
		case createMessageAction.ACTION:
		case getMessagesByUserAction.ACTION:
			return {
				...state,
				loading: true,
			};
		case getAllMessagesAction.ACTION_COMPLETED:
		case createMessageAction.ACTION_COMPLETED:
		case getMessagesByUserAction.ACTION_COMPLETED:
			return {
				...state,
				data: action.data,
				loading: false,
				error: null,
			};
		case getAllMessagesAction.ACTION_FAILED:
		case createMessageAction.ACTION_FAILED:
		case getMessagesByUserAction.ACTION_FAILED:
			return {
				...state,
				data: null,
				loading: false,
				error: action.error,
			};
		default:
			return state;
	}
};