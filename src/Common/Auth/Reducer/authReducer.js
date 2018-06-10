import loginAction from '../Action/loginAction';
import fireBaseLoggedInAction from "../Action/fireBaseLoggedInAction";

export const initialState = {
	loading: false,
	data: null,
	error: null,
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case loginAction.ACTION:
			return {
				...state,
				loading: true,
			};
		case fireBaseLoggedInAction.ACTION: {
			return {
				...state,
				data: action.payload,
				loading: false,
				error: null,
			};
		}
		case loginAction.ACTION_FAILED:
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