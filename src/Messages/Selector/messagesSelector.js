import { createSelector } from 'reselect';

const messagesDataSelector = state => state.messages;
const defaultMessages = {};

const messagesSelector = createSelector(
	[messagesDataSelector],
	messagesData => {
		return messagesData || defaultMessages;
	}
);

export default messagesSelector;
