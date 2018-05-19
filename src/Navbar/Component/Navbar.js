import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

const className = "Navbar";
const controlsClassName = `${className}__Controls`;

class Navbar extends Component {
	render() {
		return (
			<div className={className}>
				<div className={controlsClassName}>
					<Button className={`${controlsClassName}__Button`}>{"Login"}</Button>
				</div>
			</div>
		);
	}
}

export default Navbar;
