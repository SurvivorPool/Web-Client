export default class Requests {

	static formatPayload(data, method) {
		return {
			body: JSON.stringify(data),
			headers:{
				'Content-Type': 'application/json'
			},
			method,
		};
	}

	static fetch(url, method, payload = {},) {
		return fetch(url, Requests.formatPayload(payload, method))
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
		return Requests.fetch(url, data, 'POST');
	}

	static put(url, data) {
		return Requests.fetch(url, data, 'PUT');
	}

	static delete(url) {
		return Requests.fetch(url, 'DELETE');
	}

}
