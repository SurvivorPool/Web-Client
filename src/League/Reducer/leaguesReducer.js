import getAllLeaguesAction from "../Action/getAllLeaguesAction";

export const initialState = {
	loading: false,
	data: null,
	error: null,
};

export default function leagueReducer(state = initialState, action) {
	switch (action.type) {
		case getAllLeaguesAction.ACTION:
			return {
				...state,
				loading: true,
			};
		case getAllLeaguesAction.ACTION_COMPLETED:
			return {
				...state,
				data: action.data,
				loading: false,
				error: null,
			};
		case getAllLeaguesAction.ACTION_FAILED:
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