import Requests from "../../Common/Util/Requests";

export default class MessagesApi {

	static markRead(message) {
		return Requests.put(`/user/${message.user_id}/messages`, message);
	}

	static get(userId) {
		return Requests.get(`/user/${userId}/messages`);
	}

	/* Admin */
	static create(message) {
		return Requests.put('/admin/user/message', message);
	}

	static update(message) {
		return Requests.put('/admin/user/message', message);
	}

	static getAllMessages() {
		return Requests.get('/admin/user/messages');
	}

}

