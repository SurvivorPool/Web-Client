import loginAction from '../Action/loginAction';
import fireBaseLoggedInAction from "../Action/fireBaseLoggedInAction";
import logoutAction from '../Action/logoutAction';
import userAuthTokenAction from '../Action/userAuthTokenAction';

import LocalStorage from "../../Util/LocalStorage";

const prevAuth = LocalStorage.get('auth');

export const initialState = {
	loading: false,
	data:  prevAuth && prevAuth.uid ? {
			...prevAuth,
			isLoggedIn : true,
			token: prevAuth.token,
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
					...state.data,
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
		case loginAction.ACTION_COMPLETED:
			return {
				data: {
					...state.data,
					...action.data
				},
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
		case userAuthTokenAction.ACTION:
			return {
				...state,
				data: {
					...state.data,
					token: action.payload || action.payload.token,
				}
			};
		default:
			return state;
	}
};