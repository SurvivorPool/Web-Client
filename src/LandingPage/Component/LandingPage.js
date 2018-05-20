import React, { Component } from 'react';
import { Image  } from 'semantic-ui-react';
import autoBind from 'react-autobind';
import ReactModal from 'react-modal';

import Navbar from "../../Navbar/Component/Navbar";
import PrimaryButton from "../../Common/PrimaryButton/PrimaryButton";

import logo from 'Images/logo.png';

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
		ReactModal.setAppElement('#root');
		return (
			<ReactModal
				isOpen={this.state.isLoggingIn}
				className={modalClassName}
				overlayClassName={`${modalClassName}__Overlay`}
			>
				<div className={`${modalClassName}__Content`}>
					<div className={`${modalClassName}__Controls`}>
						<PrimaryButton onClick={this.onCloseModalClick}>{"Close"}</PrimaryButton>
					</div>
				</div>
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
						<p>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eros mauris, volutpat vitae auctor ut, semper et arcu. Sed tempor ultricies viverra. Sed ornare ante eget porta sollicitudin. Etiam facilisis lacus et elementum commodo. Phasellus non nisl euismod, aliquam risus quis, egestas felis. Suspendisse semper ante tellus, id dignissim neque efficitur at. Mauris eu ex non libero laoreet molestie congue sodales arcu. Duis hendrerit et sapien vitae egestas. Suspendisse non tristique justo, in scelerisque erat. Integer vel eros at purus interdum laoreet sed ullamcorper magna."}</p>
						<p>{"Cras finibus mollis odio, nec volutpat sem blandit non. Nulla malesuada diam nec urna mollis, dignissim congue quam imperdiet. In sed lectus nulla. Etiam varius nisi eu nibh accumsan dictum. Donec a ultricies felis. Vivamus vitae ultricies nisi, at porta risus. Nullam a neque porta, consectetur ex a, feugiat leo. Nulla maximus justo nec sem pretium viverra. Sed sed quam erat."}</p>
						<p>{"Morbi consequat malesuada mauris, tincidunt placerat libero congue vel. Nullam varius, nisl at tempus maximus, nunc leo dapibus libero, nec sodales dolor felis ut ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce eu molestie sapien. Morbi sollicitudin nunc nec enim sodales, nec bibendum magna consectetur. Vivamus nunc dolor, consequat at odio eu, pellentesque finibus sapien. Donec eget elementum risus. Sed enim ex, hendrerit nec luctus id, porta nec massa. Nunc auctor lacinia volutpat. Nam tincidunt metus suscipit velit mollis, quis imperdiet magna interdum. Cras eu est non nulla hendrerit aliquam. In odio tortor, vulputate eu mollis eget, pellentesque eu magna."}</p>
					</div>
				</section>
			</div>
		);
	}
}

export default LandingPage;
