import { createSelector } from 'reselect';

const authDataSelector = state => state.auth;
const defaultAuth = {};

const authSelector = createSelector(
	[authDataSelector],
	authData => {
		return authData || defaultAuth;
	}
);

export default authSelector;
