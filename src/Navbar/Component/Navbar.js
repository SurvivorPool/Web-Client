import React, { Component } from 'react';
import PropTypes from "prop-types";

const className = "Navbar";
const controlsClassName = `${className}__Controls`;

class Navbar extends Component {
	render() {
		const props = this.props;
		return props.isVisible ? (
			<div className={className}>
				<div className={controlsClassName}>
					{props.children}
				</div>
			</div>
		) : null;
	}
}

Navbar.defaultProps = {
	isVisible: true,
};


Navbar.propTypes = {
	isVisible: PropTypes.bool,
};

export default Navbar;
