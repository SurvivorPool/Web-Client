import React, { Component } from 'react';
import PropTypes from "prop-types";

import PrimaryButton from '../../Common/PrimaryButton/PrimaryButton';

const className = "Navbar";
const controlsClassName = `${className}__Controls`;

class Navbar extends Component {
	render() {
		return (
			<div className={className}>
				<div className={controlsClassName}>
					<PrimaryButton onClick={this.props.onLoginClick}>{"Login"}</PrimaryButton>
				</div>
			</div>
		);
	}
}

Navbar.defaultProps = {
	onLoginClick : () => {},
};


Navbar.propTypes = {
	onLoginClick : PropTypes.func,
};

export default Navbar;
