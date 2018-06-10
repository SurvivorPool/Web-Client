import loginAction from '../Action/loginAction';
import firebaseLoggedInAction from "../Action/fireBaseLoggedInAction";
import userExistsAction from "../Action/userExistsAction";
import userCreateAction from "../Action/userCreateAction";
import userGetAction from "../Action/userGetAction";

import { firebaseLogin } from "../Util/firebase";
import Analytics from "../../Analytics/Analytics";

export default function authMiddleware({ getState, dispatch }) {
	return (next) =>
		(action) => {
			const nextState = next(action);
			authMiddlewareListeners(action, getState, dispatch);
			return nextState;
		};
}

function authMiddlewareListeners(action, getState, dispatch) {
	switch (action.type) {
		case loginAction.ACTION: {
			firebaseLogin(action.payload)
				.then(userAuth => {
					Promise.all([
						dispatch(firebaseLoggedInAction(userAuth)),
						dispatch(userExistsAction(userAuth)).then(exists => {
							!exists ? dispatch(userCreateAction(userAuth)) : dispatch(userGetAction(exists))
						})
					]);
					Analytics.setContextRaven(userAuth);
					Analytics.tagInspectlet({
						email: userAuth.email,
						name: userAuth.displayName,
					});
					Analytics.identifyInspectlet(userAuth.email);
				});
			break;
		}
		default:
			break;
	}
}