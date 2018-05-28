import React, { Component } from 'react';
import { Image, Icon, Button, Segment, Divider } from 'semantic-ui-react';
import autoBind from 'react-autobind';
import ReactModal from 'react-modal';

import Navbar from "../../Navbar/Component/Navbar";
import PrimaryButton from "../../Common/PrimaryButton/PrimaryButton";

import logo from 'Images/logo.png';
import { HelmetIcon, RefereeIcon } from "Icons/Icons.js";

const className = "LandingPage";
const heroClassName = `${className}__Hero`;
const sectionClassName = `${className}__Section`;
const modalClassName = `${className}__Modal`;

class LandingPage extends Component {
	constructor(props) {
		super(props);
		autoBind(this);

		this.state = {
			isLoggingIn : false,
		}
	}

	onLoginClick() {
		this.setState({
			isLoggingIn : true,
		});
	}

	onCloseModalClick() {
		this.setState({
			isLoggingIn : false,
		});
	}

	renderLoginModal() {
		return (
			<ReactModal
				isOpen={this.state.isLoggingIn}
				className={modalClassName}
				overlayClassName={`${modalClassName}__Overlay`}
			>
				<Segment stacked>
					<div className={`${modalClassName}__Content`}>
						<div className={`${modalClassName}__Controls`}>
							<PrimaryButton onClick={this.onCloseModalClick}>{"Close"}</PrimaryButton>
						</div>
						<div className={`${modalClassName}__Login`}>
							<div className={`${modalClassName}__Login__Title`}>
								<RefereeIcon
									className={`${modalClassName}__Login__Icon`}
								/>
								<h1 className={`${modalClassName}__Login__h1`}>{"Login"}</h1>
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

	render() {
		return (
			<div className={className}>
				<Navbar onLoginClick={this.onLoginClick}/>
				<header className={heroClassName}>
					<div className={`${heroClassName}__Container`}>
						<Image src={logo} className={`${className}__Hero__Logo`}/>
					</div>
				</header>
				{this.renderLoginModal()}
				<section className={sectionClassName}>
					<div className={`${sectionClassName}__Content`}>
						<HelmetIcon
							className={`${className}__Icon`}
						/>
					</div>
				</section>
			</div>
		);
	}
}

export default LandingPage;
