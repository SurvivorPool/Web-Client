import loginAction from '../Action/loginAction';

import { login } from "../Util/firebase";

export default function authMiddleware({ getState, dispatch }) {
	return (next) =>
		(action) => {
			const nextState = next(action);
			authMiddlewareListeners(action, getState, dispatch);
			return nextState;
		};
}

function authMiddlewareListeners(action) {
	switch (action.type) {
		case loginAction.ACTION: {
			login(action.payload);
			break;
		}
	}
}