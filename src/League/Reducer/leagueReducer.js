import getLeagueAction from "../Action/getLeagueAction";
import createLeagueAction from "../Action/createLeagueAction";

export const initialState = {
	loading: false,
	data: null,
	error: null,
};

export default function leagueReducer(state = initialState, action) {
	switch (action.type) {
		case getLeagueAction.ACTION:
		case createLeagueAction.ACTION:
			return {
				...state,
				loading: true,
			};
		case getLeagueAction.ACTION_COMPLETED:
		case createLeagueAction.ACTION_COMPLETED:
			return {
				...state,
				data: action.data,
				loading: false,
				error: null,
			};
		case getLeagueAction.ACTION_FAILED:
		case createLeagueAction.ACTION_FAILED:
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