import Raven from 'raven-js';

export default class Analytics  {
	constructor() {
		this.inspectlet = window.__insp || [];
		this.environment = process.env.NODE_ENV;
	}

	static setInspectlet() {
		window.__insp = window.__insp || [];
		Analytics.inspectlet = window.__insp;
	}

	static tagInspectlet(tagData) {
		Analytics.setInspectlet();
		Analytics.inspectlet.push(["tagSession", tagData]);
	}

	static identifyInspectlet(email) {
		Analytics.setInspectlet();
		Analytics.inspectlet.push(['identify', email]);
	}

	static setContextRaven(user) {
		Raven.setUserContext({
			email: user.email,
			name: user.displayName,
		});
	}

	static initLibraries() {
		Analytics.tagInspectlet({
			Environment: process.env.NODE_ENV
		});

		if(Analytics.environment === 'production') {
			Raven.config('https://69981ad2101346eaab19a950f9a89771@sentry.io/1221619', {
				release: '0-0-0',
				environment: 'production',
			}).install();
		}
	}
}
