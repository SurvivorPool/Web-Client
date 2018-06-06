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
}
