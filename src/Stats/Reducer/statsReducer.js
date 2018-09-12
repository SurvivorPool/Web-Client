import getLeagueStatsAction from "../Action/getLeagueStatsAction";

export const initialState = {
	loading: false,
	data: null,
	error: null,
};

export default function playerTeamReducer(state = initialState, action) {
	switch (action.type) {
		case getLeagueStatsAction.ACTION:
			return {
				...state,
				loading: true,
			};
		case getLeagueStatsAction.ACTION_COMPLETED:
			return {
				...state,
				data: action.data,
				loading: false,
				error: null,
			};
		case getLeagueStatsAction.ACTION_FAILED:
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