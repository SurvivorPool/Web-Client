import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from "prop-types";

const className = "PrimaryButton";

class PrimaryButton extends Component {
	render() {
		return (
			<Button className={this.props.className} onClick={this.props.onClick}>{this.props.children}</Button>
		);
	}
}

PrimaryButton.defaultProps = {
	onClick : () => {},
	className: className,
};

PrimaryButton.propTypes = {
	onClick : PropTypes.func,
	className: PropTypes.string,
};

export default PrimaryButton;
