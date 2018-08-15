import {push} from "connected-react-router";
import * as firebase from 'firebase/app';
import 'firebase/auth';

import loginAction from '../Action/loginAction';
import logoutAction from '../Action/logoutAction';
import firebaseLoggedInAction from "../Action/fireBaseLoggedInAction";
import userExistsAction from "../Action/userExistsAction";
import userCreateAction from "../Action/userCreateAction";
import userGetAction from "../Action/userGetAction";
import userClearAction from "../Action/userClearAction";

import { firebaseLogin } from "../Util/firebase";
import Analytics from "../../Analytics/Analytics";
import LocalStorage from "../../Util/LocalStorage";
import { setToken } from "../../Util/Requests";

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
					firebase.auth().currentUser.getIdToken(true).then(token => {
						setToken(token);
						Promise.all([
							dispatch(firebaseLoggedInAction({ ...userAuth, token })),
							dispatch(userExistsAction(userAuth)).then(response => {
								const exists = !!response.exists;
								!exists ? dispatch(userCreateAction(userAuth)) : dispatch(userGetAction({user_id: userAuth.uid}))
							}),
						]);
						Analytics.setContextRaven(userAuth);
						Analytics.tagInspectlet({
							email: userAuth.email,
							name: userAuth.displayName,
						});
						Analytics.identifyInspectlet(userAuth.email);
					});
				}).catch(error => {
					dispatch(logoutAction());
				});
			break;
		}
		case firebaseLoggedInAction.ACTION: {
			if(action.payload && action.payload.uid) {
				LocalStorage.set('auth', { ...action.payload});
				dispatch(push('/dashboard'));
			}
			break;
		}
		case logoutAction.ACTION: {
			LocalStorage.delete('auth');
			dispatch(push('/'));
			dispatch(userClearAction());
			break;
		}
		default:
			break;
	}
}