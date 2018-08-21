import getGamesAction from "../Action/getGamesAction";

export const initialState = {
	loading: false,
	data: null,
	error: null,
};

export default function gamesReducer(state = initialState, action) {
	switch (action.type) {
		case getGamesAction.ACTION:
			return {
				...state,
				loading: true,
			};
		case getGamesAction.ACTION_COMPLETED:
			return {
				...state,
				data: action.data,
				loading: false,
				error: null,
			};
		case getGamesAction.ACTION_FAILED:
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