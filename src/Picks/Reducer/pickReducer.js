import createPickAction from "../Action/createPickAction";
import clearPickAction from "../Action/clearPickAction";

export const initialState = {
	loading: false,
	data: null,
	error: null,
};

export default function gamesReducer(state = initialState, action) {
	switch (action.type) {
		case createPickAction.ACTION:
			return {
				...state,
				loading: true,
			};
		case createPickAction.ACTION_COMPLETED:
			return {
				...state,
				data: action.data,
				loading: false,
				error: null,
			};
		case createPickAction.ACTION_FAILED:
			return {
				...state,
				data: null,
				loading: false,
				error: action.error,
			};
		case clearPickAction.ACTION:
			return {
				...initialState,
			};
		default:
			return state;
	}
};