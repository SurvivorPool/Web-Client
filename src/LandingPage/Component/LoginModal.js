import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Icon, Button, Segment, Divider } from 'semantic-ui-react';
import ReactModal from 'react-modal';

import PrimaryButton from '../../Common/PrimaryButton/PrimaryButton';
import { RefereeIcon } from "Icons/Icons.js";

const modalClassName = "LoginModal";

class LoginModal extends Component {
	render() {
		return (
			<ReactModal
				isOpen={this.props.isOpen}
				className={modalClassName}
				overlayClassName={`${modalClassName}__Overlay`}
			>
				<Segment stacked>
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
								<Button color={'facebook'}>
									<Icon name={'facebook'} />
									{"Facebook"}
								</Button>
								<Button color={'google plus'}>
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
				</Segment>
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
