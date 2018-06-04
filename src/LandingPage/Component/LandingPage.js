import React, { Component } from 'react';
import { Image, Card } from 'semantic-ui-react';
import autoBind from 'react-autobind';

import Navbar from "../../Navbar/Component/Navbar";
import LoginModal from './LoginModal';

import logo from 'Images/logo.png';
import { CupIcon, HelmetIcon, StrategyIcon } from "Icons/Icons.js";

const className = "LandingPage";
const heroClassName = `${className}__Hero`;
const sectionClassName = `${className}__Section`;
const cardClassName = `${sectionClassName}__Card`;

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
				<Navbar isVisible={!this.state.isLoggingIn} onLoginClick={this.onLoginClick}/>
				<header className={heroClassName}>
					<div className={`${heroClassName}__Container`}>
						<Image src={logo} className={`${className}__Hero__Logo`} alt={"SurvivorPool logo"}/>
					</div>
				</header>
				{this.renderLoginModal()}
				<section className={sectionClassName} id={"Overview"}>
					<span className={`${sectionClassName}__Title`}>{"How it Works"}</span>
					<div className={`${sectionClassName}__Content`}>
						<Card.Group>
							<Card className={cardClassName}>
								<Card.Content>
									<Card.Header className={`${cardClassName}__Header`}>
										{"Pick a Team"}
									</Card.Header>
								</Card.Content>
								<Card.Content className={`${cardClassName}__Content`}>
									<StrategyIcon className={`${className}__Icon`}/>
									<p>{"Each week, choose a team as your pick for the week. You can only choose each time once."}</p>
								</Card.Content>
							</Card>
							<Card className={cardClassName}>
								<Card.Content>
									<Card.Header className={`${cardClassName}__Header`}>
										{"Battle Other Players"}
									</Card.Header>
								</Card.Content>
								<Card.Content className={`${cardClassName}__Content`}>
									<HelmetIcon className={`${className}__Icon`}/>
									<p>{"If your team wins that week, you advance on to the next week. Lose and you're out."}</p>
								</Card.Content>
							</Card>
							<Card className={cardClassName}>
								<Card.Content>
									<Card.Header className={`${cardClassName}__Header`}>
										{"Survive"}
									</Card.Header>
								</Card.Content>
								<Card.Content className={`${cardClassName}__Content`}>
									<CupIcon className={`${className}__Icon`}/>
									<p>{"Don't sink and be crowned the season champion."}</p>
								</Card.Content>
							</Card>
						</Card.Group>
					</div>
				</section>
			</div>
		);
	}
}

export default LandingPage;
