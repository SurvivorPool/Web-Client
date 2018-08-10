import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import adminSelector from "../Selector/adminSelector";

export default function(DecoratedComponent) {
	@connect(
		state => ({
			isAdmin: adminSelector(state),
		})
	)
	class AdminDecorator extends Component {
		render() {
			const props = this.props;
			if(!props.isAdmin) {
				return <Redirect to={"/"}/>;
			}

			return (
				<DecoratedComponent
					{...this.props}
				/>
			)
		}
	}

	return AdminDecorator;
}

