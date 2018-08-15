import store from '../../configureStore';

import logoutAction	 from '../Auth/Action/logoutAction';

const isProd =  process.env.NODE_ENV === 'production';
const api = isProd ? `/api` : process.env.REACT_APP_API_URL;

let firebaseToken = null;

export function setToken(token) {
	firebaseToken = token || (store.getState().auth.data && store.getState().auth.data.token) || null;
}

export default class Requests {
	static formatPayload(data, method) {
		setToken();
		const request = {
			method,
			headers: {
				'auth': firebaseToken,
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

		if (response.status > 400) {
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
