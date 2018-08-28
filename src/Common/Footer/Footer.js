import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from "prop-types";
import { Divider, Container, Icon } from 'semantic-ui-react';
import ReactModal from 'react-modal';

import PrimaryButton from "../Button/PrimaryButton";

const className = "Footer";
const modalClassName = "LoginModal";

class Footer extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
			isRulesModalOpen: false,
		};
	}

	closeRulesModal() {
		this.setState({
			isRulesModalOpen: false,
		});
	}

	openRulesModal() {
		this.setState({
			isRulesModalOpen: true,
		});
	}

	renderRulesModal() {
		return this.state.isRulesModalOpen ? (
			<ReactModal
				isOpen={this.state.isRulesModalOpen}
				className={modalClassName}
				overlayClassName={`${modalClassName}__Overlay`}
				closeTimeoutMS={150}
			>
				<div className={`${modalClassName}__Content`}>
					<div className={`${modalClassName}__Controls`}>
						<PrimaryButton onClick={this.closeRulesModal}>{"Close"}</PrimaryButton>
					</div>
					<div className={`${className}__Rules`}>
						<h2>In a Nutshell</h2>
						<p>Create team(s) to pick one NFL team per week to win in their respective matchup. If they win, your team moves on to the next week. If they lose, your team is eliminated. You may only select an NFL team once throughout the season. The picks are not made against the spread and ties are counted as losses. Winner takes all.</p>

						<div>
							<h3>Gritty Details</h3>
							<ul>
								<li>Each user can have multiple teams (user-teams), provided they pay the entry fee for each one of them.</li>
								<li>One pick per user-team is required each week. If one of your user-teams does not have a selection that week, it is counted as a loss and that user-team is eliminated.</li>
								<li>Surviving is user-team specific, so if you have "Team A" and "Team B" and "Team B's" selection loses, "Team A" is still active if their selection wins and vice-versa.</li>
								<li>Similar to the above, NFL team selections are user-team specific as well. So if "Team A" takes the Giants in week 1, "Team B" is allowed to take the Giants any week of the season.</li>
								<li>All picks must be made before that particular NFL game has started.</li>
								<li>You cannot edit your pick if your current selection's NFL game has started.</li>
							</ul>
						</div>
					</div>
				</div>
			</ReactModal>
		) : null;
	}

	static renderDivider(props) {
		return !props.shouldHideDivider ? <Divider/> : null;
	}

	static renderRulesLink(props, onClick) {
		return props.shouldShowRules ? <a onClick={onClick}>Rules</a> : null;
	}

	render() {
		return (
			<footer className={className}>
				{this.renderRulesModal()}
				<Container>
					{Footer.renderDivider(this.props)}
					<div className={`${className}__Container`}>
						<div className={`${className}__Links`}>
							<a href={"mailto:admin@survivorpool.win"}>Contact us</a>
							{Footer.renderRulesLink(this.props, this.openRulesModal)}
						</div>
						<p className={`${className}__Text`}>Survivor Pool is not affiliated with The National Football League (NFL). The team names, logos and uniform designs are registered trademarks of the teams indicated. All other NFL-related trademarks are trademarks of the National Football League.</p>
						<a
							href={"https://github.com/SurvivorPool"}
							className={`${className}__Github`}
						>
							<Icon name={'github'} size={'small'}/>
						</a>
					</div>
				</Container>

			</footer>
		);
	}
}

Footer.defaultProps = {
	shouldHideDivider: false,
	shouldShowRules: true,
};

Footer.propTypes = {
	shouldHideDivider: PropTypes.bool,
	shouldShowRules: PropTypes.bool,
};

export default Footer;
