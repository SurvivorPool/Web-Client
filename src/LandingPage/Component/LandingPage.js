import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import autoBind from 'react-autobind';

import Navbar from "../../Navbar/Component/Navbar";
import LoginModal from './LoginModal';

import logo from 'Images/logo.png';
import { HelmetIcon } from "Icons/Icons.js";

const className = "LandingPage";
const heroClassName = `${className}__Hero`;
const sectionClassName = `${className}__Section`;

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
		return <LoginModal
			isOpen={this.state.isLoggingIn}
			onClose={this.onCloseModalClick}
		/>
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
