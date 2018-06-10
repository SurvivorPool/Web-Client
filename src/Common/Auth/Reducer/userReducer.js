import userCreateAction from '../Action/userCreateAction';
import userGetAction from '../Action/userGetAction';

export const initialState = {
	loading: false,
	data: null,
	error: null,
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case userGetAction.ACTION:
		case userCreateAction.ACTION:
			return {
				...state,
				loading: true,
			};
		case userGetAction.ACTION_COMPLETED:
		case userCreateAction.ACTION_COMPLETED: {
			return {
				...state,
				data: action.data,
				loading: false,
				error: null,
			};
		}
		case userGetAction.ACTION_FAILED:
		case userCreateAction.ACTION_FAILED:
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