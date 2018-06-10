import Raven from 'raven-js';

export default class Analytics  {
	constructor() {
		this.inspectlet = window.__insp || [];
	}

	static setInspectlet() {
		window.__insp = window.__insp || [];
		this.inspectlet = window.__insp;
	}

	static tagInspectlet(tagData) {
		Analytics.setInspectlet();
		this.inspectlet.push(["tagSession", tagData]);
	}

	static initLibraries() {
		Analytics.tagInspectlet({
			Environment: process.env.NODE_ENV
		});

		Raven.config('https://69981ad2101346eaab19a950f9a89771@sentry.io/1221619', {
			release: '0-0-0',
			environment: process.env.NODE_ENV,
		}).install();
	}
}
