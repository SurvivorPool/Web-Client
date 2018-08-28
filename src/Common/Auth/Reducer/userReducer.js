import userCreateAction from '../Action/userCreateAction';
import userGetAction from '../Action/userGetAction';
import userExistsAction from '../Action/userExistsAction';
import userClearAction from "../Action/userClearAction";
import userSetNotificationAction from "../Action/userSetNotificationAction";

import LocalStorage from "../../Util/LocalStorage";

const prevUser = LocalStorage.get('user');

export const initialState = {
	loading: false,
	data: prevUser ? {
		...prevUser
		} : null,
	error: null,
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case userGetAction.ACTION:
		case userCreateAction.ACTION:
		case userSetNotificationAction.ACTION:
			return {
				...state,
				loading: true,
			};
		case userGetAction.ACTION_COMPLETED:
		case userCreateAction.ACTION_COMPLETED:
		case userSetNotificationAction.ACTION_COMPLETED:
			return {
				...state,
				data: action.data,
				loading: false,
				error: null,
			};
		case userGetAction.ACTION_FAILED:
		case userCreateAction.ACTION_FAILED:
		case userExistsAction.ACTION_FAILED:
		case userSetNotificationAction.ACTION_FAILED:
			return {
				...state,
				data: null,
				loading: false,
				error: action.error,
			};
		case userClearAction.ACTION:
			return {
				data: null,
				loading: false,
				error: null,
			};
		default:
			return state;
	}
};