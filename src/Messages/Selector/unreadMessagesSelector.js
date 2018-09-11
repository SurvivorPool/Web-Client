import { createSelector } from 'reselect';
import messagesSelector from "./messagesSelector";

const defaultUnread = 0;

const unreadMessagesSelector = createSelector(
	[messagesSelector],
	messagesData => {
		const messages = (messagesData.data && messagesData.data.messages) || [];
		const count = messages.reduce((unread, message) => {
			if(!message.read) {
				return ++unread;
			}
			return unread;
		}, 0);
		return count || defaultUnread;
	}
);

export default unreadMessagesSelector;
