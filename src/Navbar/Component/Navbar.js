import React, { Component } from 'react';
import PropTypes from "prop-types";

import PrimaryButton from '../../Common/PrimaryButton/PrimaryButton';

const className = "Navbar";
const controlsClassName = `${className}__Controls`;

class Navbar extends Component {
	render() {
		return this.props.isVisible ? (
			<div className={className}>
				<div className={controlsClassName}>
					<a className={`${className}__Link`} href={"#Overview"}>{"How it works"}</a>
					<PrimaryButton onClick={this.props.onLoginClick}>{"Login"}</PrimaryButton>
				</div>
			</div>
		) : null;
	}
}

Navbar.defaultProps = {
	onLoginClick : () => {},
	isVisible: true,
};


Navbar.propTypes = {
	onLoginClick : PropTypes.func,
	isVisible: PropTypes.bool,
};

export default Navbar;
