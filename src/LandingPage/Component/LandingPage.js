import React, { Component } from 'react';
import { Image, Card, Icon } from 'semantic-ui-react';
import autoBind from 'react-autobind';
import { Link, Element } from 'react-scroll';

import Navbar from "../../Navbar/Component/Navbar";
import LoginModal from './LoginModal';
import PrimaryButton from "../../Common/PrimaryButton/PrimaryButton";
import Profile from "../../Profile/Component/Profile";

import AuthDecorator from "../../Common/Auth/Component/AuthDecorator";
import LoaderDecorator from "../../Common/Loader/Component/LoaderDecorator";

import logo from 'Images/logo.png';
import { CupIcon, HelmetIcon, StrategyIcon } from "Icons/Icons.js";

const className = "LandingPage";
const heroClassName = `${className}__Hero`;
const sectionClassName = `${className}__Section`;
const footerClassName = `${className}__Footer`;
const cardClassName = `${sectionClassName}__Card`;

@AuthDecorator
@LoaderDecorator
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
			startLogin={this.props.login}
		/>
	}

	static renderPlayCards() {
		return (
			<Card.Group centered>
				<Card className={cardClassName}>
					<Card.Content>
						<Card.Header className={`${cardClassName}__Header`}>
							{"Pick a Team"}
						</Card.Header>
					</Card.Content>
					<Card.Content className={`${cardClassName}__Content`}>
						<StrategyIcon className={`${className}__Icon`}/>
						<p>{"Choose one team as your pick for the week. You can only select a team once.."}</p>
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
						<p>{"If your team wins that week, you advance on to the next. Lose and you're sunk."}</p>
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
		);
	}

	static renderHeader() {
		return (
			<header className={heroClassName}>
				<div className={`${heroClassName}__Container`}>
					<Image
						src={logo}
						className={`${className}__Hero__Logo`}
						alt={"SurvivorPool logo"}
					/>
					<Link
						to={"Overview"}
						smooth={true}
					>
						<Icon
							className={`${heroClassName}__Chevron`}
							name={"chevron down"}
							size={"huge"}
							color={"orange"}
						/>
					</Link>
				</div>
			</header>
		);
	}

	static renderHowToPlay() {
		return (
			<section className={sectionClassName}>
				<Element name={"Overview"}/>
				<span className={`${sectionClassName}__Title`}>
						{"How to Play"}
					</span>
				<div className={`${sectionClassName}__Content`}>
					{LandingPage.renderPlayCards()}
				</div>
			</section>
		);
	}

	static renderFooter() {
		return (
			<footer className={footerClassName} id={"Footer"}>
				<div className={`${footerClassName}__Content`}>
					<p>Survivor Pool is not affiliated with The National Football League (NFL).</p>
					<p>The team names, logos and uniform designs are registered trademarks of the teams indicated. All other NFL-related trademarks are trademarks of the National Football League.</p>
				</div>
			</footer>
		);
	}

	renderProfile(props) {
		return props.auth.data && props.auth.data.isLoggedIn ? (
			<Profile
				currentPage={'/'}
			/>
		) : (
			<PrimaryButton onClick={this.onLoginClick}>
				{"Sign In"}
			</PrimaryButton>
		);
	}

	render() {
		const props = this.props;
		return (
			<div className={className}>
				<Navbar
					isVisible={!this.state.isLoggingIn}
				>
					<Link
						to={"Overview"}
						smooth={true}
						className={'Navbar__Link'}
					>
						{"How to Play"}
					</Link>
					{this.renderProfile(props)}
				</Navbar>
				{LandingPage.renderHeader()}
				{this.renderLoginModal()}
				{LandingPage.renderHowToPlay()}
				{LandingPage.renderFooter()}
			</div>
		);
	}
}

export default LandingPage;
