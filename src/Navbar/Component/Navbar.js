import React, { Component } from 'react';
import PropTypes from "prop-types";

const className = "Navbar";
const controlsClassName = `${className}__Controls`;

class Navbar extends Component {

	render() {
		const props = this.props;
		const simpleControls = props.isSimple ? `${controlsClassName}__Simple` : '';

		return props.isVisible ? (
			<div className={className}>
				<div className={`${controlsClassName} ${simpleControls}`}>
					{props.children}
				</div>
			</div>
		) : null;
	}
}


Navbar.defaultProps = {
	isVisible: true,
	isSimple: false,
};


Navbar.propTypes = {
	isVisible: PropTypes.bool,
	isSimple: PropTypes.bool,
};

export default Navbar;
