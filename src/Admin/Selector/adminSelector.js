import { createSelector } from 'reselect';

const userDataSelector = state => state.user.data;

const adminSelector = createSelector(
	[userDataSelector],
	userData => {
		return userData.is_admin || false;
	}
);

export default adminSelector;
