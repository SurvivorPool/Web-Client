import getLeagueByUserAction from "../Action/getLeagueByUserAction";

export const initialState = {
	loading: false,
	data: null,
	error: null,
};

export default function playerLeaguesReducer(state = initialState, action) {
	switch (action.type) {
		case getLeagueByUserAction.ACTION:
			return {
				...state,
				loading: true,
			};
		case getLeagueByUserAction.ACTION_COMPLETED:
			return {
				...state,
				data: action.data,
				loading: false,
				error: null,
			};
		case getLeagueByUserAction.ACTION_FAILED:
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