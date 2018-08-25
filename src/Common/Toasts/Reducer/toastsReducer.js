import createToastAction from "../Action/createToastAction";
import deleteToastAction from "../Action/deleteToastAction";

export const initialState = {
	data: null,
};

export default function toastsReducer(state = initialState, action) {
	switch (action.type) {
		case createToastAction.ACTION:
			return {
				data: action.payload,
			};
		case deleteToastAction.ACTION_COMPLETED:
			return {
				data: null,
			};
		default:
			return state;
	}
};