import { createSelector } from 'reselect';

const usersDataSelector = state => state.users;
const defaultUsers = {};

const usersSelector = createSelector(
	[usersDataSelector],
	usersData => {
		return usersData || defaultUsers;
	}
);

export default usersSelector;
