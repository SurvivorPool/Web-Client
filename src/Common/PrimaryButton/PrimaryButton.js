import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from "prop-types";

const className = "PrimaryButton";

class PrimaryButton extends Component {
	render() {
		return (
			<Button className={className} onClick={this.props.onClick}>{this.props.children}</Button>
		);
	}
}

PrimaryButton.defaultProps = {
	onClick : () => {},
};

PrimaryButton.propTypes = {
	onClick : PropTypes.func,
};

export default PrimaryButton;
