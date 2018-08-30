import Requests from "../../Common/Util/Requests";

export default class MessagesApi {

	static getByUser(user) {
		return Requests.get(`/admin/message/${user.user_id}`);
	}

	/* Admin */
	static create(message) {
		return Requests.put('/admin/message', message);
	}

	static get() {
		return Requests.get('/admin/messages');
	}

}

