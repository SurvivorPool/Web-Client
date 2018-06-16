import loginAction from '../Action/loginAction';
import fireBaseLoggedInAction from "../Action/fireBaseLoggedInAction";
import logoutAction from '../Action/logoutAction';

import LocalStorage from "../../Util/LocalStorage";

const prevAuth = LocalStorage.get('auth');

export const initialState = {
	loading: false,
	data:  prevAuth && prevAuth.uid ? {
			...prevAuth,
			isLoggedIn : true,
		} : null,
	error: null,
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case loginAction.ACTION:
			return {
				...state,
				loading: true,
			};
		case fireBaseLoggedInAction.ACTION:
			return {
				...state,
				data: {
					isLoggedIn: !!action.payload.uid,
					...action.payload
				},
				loading: false,
				error: null,
			};
		case logoutAction.ACTION:
			return {
				data: null,
				loading: false,
				error: false,
			};
		case loginAction.ACTION_FAILED:
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