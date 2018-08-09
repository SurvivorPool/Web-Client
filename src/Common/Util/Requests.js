import store from '../../configureStore';

import logoutAction	 from '../Auth/Action/logoutAction';

const isProd =  process.env.NODE_ENV === 'production';
const api = isProd ? `${process.env.REACT_APP_API_URL}/` : '';
let authToken = null;

export default class Requests {
	static setAuthorization() {
		authToken = (store.getState().auth.data && store.getState().auth.data.token) || null;
	}

	static formatPayload(data, method) {
		Requests.setAuthorization();
		const request = {
			method,
			headers: {
				'Authorization': authToken,
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

	static formatResponse(response) {
		if (response.status >= 200 && response.status <= 300) {
			return response.json();
		}

		if (response.status === 401) {
			store.dispatch(logoutAction());
		}

		const error = {
			status: response.status,
			message: response.statusText,
			url: response.url
		};

		throw error;
	}


	static fetch(url, method, payload,) {
		return fetch(`${api}${url}`, Requests.formatPayload(payload, method))
			.then(response => Requests.formatResponse(response));
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
