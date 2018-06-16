import {push} from "connected-react-router";

import loginAction from '../Action/loginAction';
import logoutAction from '../Action/logoutAction';
import firebaseLoggedInAction from "../Action/fireBaseLoggedInAction";
import userExistsAction from "../Action/userExistsAction";
import userCreateAction from "../Action/userCreateAction";
import userGetAction from "../Action/userGetAction";

import { firebaseLogin } from "../Util/firebase";
import Analytics from "../../Analytics/Analytics";
import LocalStorage from "../../Util/LocalStorage";

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
		case firebaseLoggedInAction.ACTION: {
			if(action.payload && action.payload.uid) {
				LocalStorage.set('auth', action.payload);
			}
			break;
		}
		case logoutAction: {
			LocalStorage.delete('auth');
			dispatch(push('/'));
			break;
		}
		default:
			break;
	}
}