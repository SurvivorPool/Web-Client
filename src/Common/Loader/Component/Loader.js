import React, { Component } from 'react';
import { Loader as SemanticLoader } from 'semantic-ui-react';

export default class Loader extends Component {
	render() {
		return (
			<SemanticLoader active />
		);
	}
}