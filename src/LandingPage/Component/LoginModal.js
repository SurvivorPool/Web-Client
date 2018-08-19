import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Icon, Button, Divider } from 'semantic-ui-react';
import ReactModal from 'react-modal';

import PrimaryButton from '../../Common/Button/PrimaryButton';
import { RefereeIcon } from "Icons/Icons.js";
import { facebookProvider, githubProvider, googleProvider } from "../../Common/Auth/Util/firebase";

const noop = () => {};

const modalClassName = "LoginModal";

class LoginModal extends Component {
	constructor(props) {
		super(props);

		this.googleLogin = this.props.startLogin.bind(this, googleProvider);
		this.facebookLogin = this.props.startLogin.bind(this, facebookProvider);
		this.githubLogin = this.props.startLogin.bind(this, githubProvider);
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
								<h1 className={`${modalClassName}__Login__h1`}>{"Sign in"}</h1>
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
							<Button
								color={'grey'}
								onClick={this.githubLogin}
							>
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
	onClose: noop,
	startLogin: noop,
};


LoginModal.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
	startLogin: PropTypes.func,
};

export default LoginModal;
