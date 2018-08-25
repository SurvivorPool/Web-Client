import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withToastManager } from "react-toast-notifications";

import createToastAction from "../Action/createToastAction";
import deleteToastAction from "../Action/deleteToastAction";

export default function(DecoratedComponent) {
	@withToastManager
	@connect(
		state => ({
			toasts: state.toasts,
		}),
		dispatch => ({
			createToast: toast => dispatch(createToastAction(toast)),
			deleteToast: () => dispatch(deleteToastAction()),
		})
	)
	class ToastsDecorator extends Component {
		componentDidMount() {
			const props = this.props;

			if(props.toasts.data && props.toasts.data.length) {
				props.toastManager.add(...props.toasts.data);
				props.deleteToast();
			}
		}

		componentDidUpdate(prevProps) {
			const currentProps = this.props;

			if(currentProps.toasts.data && prevProps.toasts.data !== currentProps.toasts.data) {
				currentProps.toastManager.add(...currentProps.toasts.data);
				currentProps.deleteToast();
			}
		}

		render() {
			const props = this.props;
			return (
				<DecoratedComponent
					{...props}
					createToast={props.createToast}
					deleteToast={props.deleteToast}
				/>
			)
		}
	}

	return ToastsDecorator;
}

