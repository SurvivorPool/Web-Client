import usersGetAction from '../Action/usersGetAction';
import usersClearAction from "../Action/usersClearAction";

export const initialState = {
	loading: false,
	data: null,
	error: null,
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case usersGetAction.ACTION:
			return {
				...state,
				loading: true,
			};
		case usersGetAction.ACTION_COMPLETED:
			return {
				...state,
				data: action.data,
				loading: false,
				error: null,
			};
		case usersGetAction.ACTION_FAILED:
			return {
				...state,
				data: null,
				loading: false,
				error: action.error,
			};
		case usersClearAction.ACTION:
			return {
				...initialState,
			};
		default:
			return state;
	}
};