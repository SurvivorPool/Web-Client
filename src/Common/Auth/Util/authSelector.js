import { createSelector } from 'reselect';

const authDataSelector = state => state.auth;
const defaultAuth = {};

const authSelector = createSelector(
	[authDataSelector],
	authData => {
		return authData.data || defaultAuth;
	}
);

export default authSelector;
