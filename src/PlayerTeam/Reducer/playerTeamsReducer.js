import adminGetAllPlayerTeamAction from "../Action/adminGetAllPlayerTeamAction";
import adminUpdatePlayerTeamAction from "../Action/adminUpdatePlayerTeamAction";
import adminDeletePlayerTeamAction from "../Action/adminDeletePlayerTeamAction";

export const initialState = {
	loading: false,
	data: null,
	error: null,
};

export default function playersTeamReducer(state = initialState, action) {
	switch (action.type) {
		case adminGetAllPlayerTeamAction.ACTION:
		case adminUpdatePlayerTeamAction.ACTION:
		case adminDeletePlayerTeamAction.ACTION:
			return {
				...state,
				loading: true,
			};
		case adminGetAllPlayerTeamAction.ACTION_COMPLETED:
		case adminUpdatePlayerTeamAction.ACTION_COMPLETED:
		case adminDeletePlayerTeamAction.ACTION_COMPLETED:
			return {
				...state,
				data: action.data,
				loading: false,
				error: null,
			};
		case adminGetAllPlayerTeamAction.ACTION_FAILED:
		case adminUpdatePlayerTeamAction.ACTION_FAILED:
		case adminDeletePlayerTeamAction.ACTION_FAILED:
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