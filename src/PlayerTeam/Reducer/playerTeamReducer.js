import getPlayerTeamAction from "../Action/getPlayerTeamAction";
import updatePlayerTeamAction from "../Action/updatePlayerTeamAction";
import createPlayerTeamAction from "../Action/createPlayerTeamAction";
import deletePlayerTeamAction from "../Action/deletePlayerTeamAction";

export const initialState = {
	loading: false,
	data: null,
	error: null,
};

export default function playerTeamReducer(state = initialState, action) {
	switch (action.type) {
		case getPlayerTeamAction.ACTION:
		case createPlayerTeamAction.ACTION:
		case updatePlayerTeamAction.ACTION:
		case deletePlayerTeamAction.ACTION:
			return {
				...state,
				loading: true,
			};
		case getPlayerTeamAction.ACTION_COMPLETED:
		case createPlayerTeamAction.ACTION_COMPLETED:
		case updatePlayerTeamAction.ACTION_COMPLETED:
		case deletePlayerTeamAction.ACTION_COMPLETED:
			return {
				...state,
				data: action.data,
				loading: false,
				error: null,
			};
		case getPlayerTeamAction.ACTION_FAILED:
		case createPlayerTeamAction.ACTION_FAILED:
		case updatePlayerTeamAction.ACTION_FAILED:
		case deletePlayerTeamAction.ACTION_FAILED:
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