import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Icon, Button, Divider } from 'semantic-ui-react';
import ReactModal from 'react-modal';

import PrimaryButton from '../../Common/PrimaryButton/PrimaryButton';
import { RefereeIcon } from "Icons/Icons.js";

import loginAction from "../../Common/Auth/Action/loginAction";

const modalClassName = "LoginModal";

@connect(
	state => ({
		auth: state.auth,
	}),
	dispatch => ({
		login: provider => dispatch(loginAction(provider))
	})
)
class LoginModal extends Component {
	constructor(props) {
		super(props);

		this.googleLogin = this.props.login.bind(this, 'google');
		this.facebookLogin = this.props.login.bind(this, 'facebook');
	}
	render() {
		return (
			<ReactModal
				isOpen={this.props.isOpen}
				className={modalClassName}
				overlayClassName={`${modalClassName}__Overlay`}
				closeTimeoutMS={150}
			>
				<div className={`${modalClassName}__Content`}>
					<div className={`${modalClassName}__Controls`}>
						<PrimaryButton onClick={this.props.onClose}>{"Close"}</PrimaryButton>
					</div>
					<div className={`${modalClassName}__Login`}>
						<div className={`${modalClassName}__Login__Title`}>
							<RefereeIcon
								className={`${modalClassName}__Login__Icon`}
							/>
							<h1 className={`${modalClassName}__Login__h1`}>{"Login to play"}</h1>
						</div>
						<Divider />
						<Button.Group vertical className={`${modalClassName}__Login__Buttons`}>
							<Button
								color={'facebook'}
								onClick={this.facebookLogin}
							>
								<Icon name={'facebook'} />
								{"Facebook"}
							</Button>
							<Button
								color={'google plus'}
								onClick={this.googleLogin}
							>
								<Icon name={'google'} />
								{"Google"}
							</Button>
							<Button color={'grey'}>
								<Icon name={'github'} />
								{"Github"}
							</Button>
						</Button.Group>
					</div>
				</div>
			</ReactModal>
		);
	}
}

LoginModal.defaultProps = {
	isOpen : false,
	onClose: () => {},
};


LoginModal.propTypes = {
	isOpen : PropTypes.bool,
	onClose: PropTypes.func,
};

export default LoginModal;
