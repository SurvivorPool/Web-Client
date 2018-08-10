import { createSelector } from 'reselect';

const userDataSelector = state => state.user.data;
const defaultUser = {};

const userSelector = createSelector(
	[userDataSelector],
	userData => {
		return userData || defaultUser;
	}
);

export default userSelector;
