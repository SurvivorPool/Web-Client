import Requests from "../../Util/Requests";

export default class UserApi {

	static exists(user) {
		return Requests.get(`/users/exists/${user.uid}`);
	}

	static create(user) {
		const createdUser = {
			full_name: user.displayName,
			email: user.email,
			id: user.uid,
			picture_url: user.pictureURL,
            receive_notifications: true
		};
		return Requests.post('/users', createdUser);
	}

	static get(user) {
		return Requests.get(`/users/${user.user_id}`);
	}

	static setNotification(user) {
		return Requests.put('/users', user);
	}

	/* Admin */

	static getAll() {
		return Requests.get('/admin/users/');
	}
}
