import { createSelector } from 'reselect';

const userDataSelector = state => state.user;
const defaultUser = {};

const userSelector = createSelector(
	[userDataSelector],
	userData => {
		return userData || defaultUser;
	}
);

export default userSelector;
