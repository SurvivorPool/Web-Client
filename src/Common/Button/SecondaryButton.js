import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from "prop-types";

const className = "SecondaryButton";

class SecondaryButton extends Component {
	render() {
		return (
			<Button
				className={`${className} ${this.props.className}`}
				onClick={this.props.onClick}
				value={this.props.value}
			>
				{this.props.children}
			</Button>
		);
	}
}

SecondaryButton.defaultProps = {
	onClick : () => {},
	className: '',
	value: '',
};

SecondaryButton.propTypes = {
	onClick : PropTypes.func,
	className: PropTypes.string,
	value: PropTypes.string,
};

export default SecondaryButton;
