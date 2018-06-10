import * as firebase from 'firebase/app';
import 'firebase/auth';

const isProd =  process.env.NODE_ENV === 'production';
const api = isProd ? `${process.env.REACT_APP_API_URL}/` : '';

export default class Requests {
	constructor() {
		this.token = null;
	}

	static setAuthorization() {
		return firebase.auth().currentUser.getIdToken(true).then(token => { this.token = token});
	}

	static formatPayload(data, method) {
		Requests.setAuthorization();
		const request = {
			method,
			headers: {
				'Authorization': this.token,
			}
		};

		if(data) {
			request.body = JSON.stringify(data);
			request.headers = {
				...request.headers,
				'Content-Type': 'application/json',
			};
		}
		return request;
	}

	static fetch(url, method, payload,) {
		return fetch(`${api}${url}`, Requests.formatPayload(payload, method))
			.then(response => {
				return response.json();
			})
			.catch(error => {
				console.log(error);
			});
	}

	static get(url) {
		return Requests.fetch(url, 'GET')
	}

	static post(url, data) {
		return Requests.fetch(url, 'POST', data);
	}

	static put(url, data) {
		return Requests.fetch(url, 'PUT', data);
	}

	static delete(url) {
		return Requests.fetch(url, 'DELETE');
	}

}
