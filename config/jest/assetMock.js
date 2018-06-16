const path = require('path');

module.exports = {
	process(src, filename, config, options) {
		return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
	},
};

global.requestAnimationFrame = (callback) => {
	setTimeout(callback, 0);
};

class LocalStorageMock {
	constructor() {
		this.store = {};
	}

	clear() {
		this.store = {};
	}

	getItem(key) {
		return this.store[key] || null;
	}

	setItem(key, value) {
		this.store[key] = value + '';
	}

	removeItem(key) {
		delete this.store[key];
	}
};
global.localStorage = new LocalStorageMock;