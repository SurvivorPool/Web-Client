import Requests from "../../Common/Util/Requests";

export default class MessagesApi {

	static markRead(message) {
		return Requests.put(`/user/${message.user_id}/messages`, message);
	}

	static get(userId) {
		return Requests.get(`/user/${userId}/messages/unread`);
	}

	/* Admin */
	static create(message) {
		return Requests.post('/admin/user/messages', message);
	}

	static update(message) {
		return Requests.put('/admin/user/messages', message);
	}

	static getAllMessages() {
		return Requests.get('/admin/user/messages');
	}

}

