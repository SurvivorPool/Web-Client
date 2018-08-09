import Requests from "../../Util/Requests";

export default class UserApi {

	static exists(user) {
		return Requests.get(`/user/exists/${user.uid}`);
	}

	static create(user) {
		const createdUser = {
			full_name: user.displayName,
			email: user.email,
			user_id: user.uid,
			picture_url: user.pictureURL
		};
		return Requests.post('/user', createdUser);
	}

	static get(user) {
		return Requests.get(`/user/${user.user_id}`);
	}
}