import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Redirect } from "react-router-dom";
import { Divider, Segment, Label } from 'semantic-ui-react';

import Navbar from "../../Navbar/Component/Navbar";
import Profile from "../../Profile/Component/Profile";
import PrimaryButton from "../../Common/PrimaryButton/PrimaryButton";

import AuthDecorator from "../../Common/Auth/Component/AuthDecorator";
import UserDecorator from "../../Common/Auth/Component/UserDecorator";
import LoaderDecorator from "../../Common/Loader/Component/LoaderDecorator";
import LeaguePageDecorator from "../Decorator/LeaguePageDecorator";

const className = "LeaguePage";

@AuthDecorator
@UserDecorator
@LeaguePageDecorator
@LoaderDecorator
class LeaguePage extends Component {
	constructor(props) {
		super(props);
		autoBind(this);

		this.state = {
			shouldRedirect: false,
		};
	}

	handleRedirect() {
		this.setState({
			shouldRedirect: true,
		});
	}

	static renderLeagueTitle(props, handleRedirect) {
		return (
			<div className={`${className}__Header__Container`}>
				<h1 className={`${className}__Header`}>
					{props.league.data.league_name}
				</h1>
				<PrimaryButton
					onClick={handleRedirect}
				>
					{"Back"}
				</PrimaryButton>
			</div>
		);
	}

	static renderLeagueInfo(props) {
		return (
			<div className={`${className}__Info__Container`}>
				<Segment raised>
					<Label
						color='orange'
						ribbon
						className={`${className}__Info__Ribbon`}
					>
						{'Description'}
					</Label>
					<div className={`${className}__Info`}>
						{props.league.data.league_description}
					</div>
				</Segment>
			</div>
		);
	}

	static renderLeague(props, handleRedirect) {
		return props.league.data && props.league.data.league_name ? (
			<React.Fragment>
				{LeaguePage.renderLeagueTitle(props, handleRedirect)}
				<Divider />
				{LeaguePage.renderLeagueInfo(props)}
			</React.Fragment>
		) :  null;
	}

	render() {
		const props = this.props;
		const { shouldRedirect } = this.state;
		const handleRedirect = this.handleRedirect;

		if(shouldRedirect) {
			return (
				<Redirect to={"/dashboard"}/>
			);
		}

		return (
			<div className={className}>
				<Navbar>
					<Profile
						currentPage={'league'}
					/>
				</Navbar>
				<div className={`${className}__Content`}>
					{LeaguePage.renderLeague(props, handleRedirect)}
				</div>
			</div>
		);
	}
}

export default LeaguePage;
