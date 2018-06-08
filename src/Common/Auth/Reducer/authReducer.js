import loginAction from '../Action/loginAction';

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
		case loginAction.ACTION_COMPLETED:
			return {
				...state,
				data: action.data,
				loading: false,
				error: null,
			};
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