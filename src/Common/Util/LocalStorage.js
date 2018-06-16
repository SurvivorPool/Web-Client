export default class LocalStorage {
	static get(key) {
		return JSON.parse(localStorage.getItem(key));
	}

	static set(key, data) {
		localStorage.setItem(key, JSON.stringify(data));
	}

	static delete(key) {
		localStorage.removeItem(key);
	}

	static clear() {
		localStorage.clear();
	}
}
