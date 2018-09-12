import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Divider, Segment, Label, Container, Card , Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

import Navbar from "../../Navbar/Component/Navbar";
import Profile from "../../Profile/Component/Profile";
import PlayerTeam from "../../PlayerTeam/Component/PlayerTeam";
import PlayerTeamAdd from "../../PlayerTeam/Component/PlayerTeamAdd";
import LeaguePlayers from "./LeaguePlayers";
import LeagueStats from "../../Stats/Component/LeagueStats";
import Footer from "../../Common/Footer/Footer";

import AuthDecorator from "../../Common/Auth/Decorator/AuthDecorator";
import UserDecorator from "../../Common/Auth/Decorator/UserDecorator";
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
			leaguePlayers: props.leaguePlayers || [],
		};
	}

	handlePlayerSearch(e, { value }) {
		value = value.toLowerCase();
		if(value) {
			const searchedPlayers = this.props.leaguePlayers.filter(team => {
				const teamName = team.team_name.toLowerCase();
				const fullName = team.user_info.full_name.toLowerCase();
				return teamName.includes(value) || fullName.includes(value);
			});

			this.setState({
				leaguePlayers: searchedPlayers,
			});
		} else {
			this.setState({
				leaguePlayers: this.props.leaguePlayers,
			});
		}
	}

	static renderLeagueTitle(props) {
		return (
			<div className={`${className}__Header__Container`}>
				<h1 className={`${className}__Header`}>
					{props.league.data.league_name}
				</h1>
				{LeaguePage.renderMeta(props)}
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
					<Divider />
					{LeaguePage.renderPaymentInfo(props)}
				</Segment>
			</div>
		);
	}

	static renderPaymentInfo(props) {
		const isFree = props.league.data && props.league.data.league_type && props.league.data.league_type === 'FREE';

		return isFree ? (
			<div>
				<p>{"Free leagues are all about the glory. You're restricted to only having 1 team."}</p>
				<p>
					<strong>{"Make it count."}</strong>
				</p>
			</div>
		) : (
			<div>
				<p>{"Any fees due for the league can be paid via venmo/paypal or cold hard cash. If paying by venmo/paypal please supply a message with either your full name or your account's email address."}</p>
				<p>
					<strong>{"Venmo: @Jimmy-Timmons or @Alex-Berardi-1"}</strong>
				</p>
				<p>
					<strong>{"Paypal: paypal.me/JimmyTimmons"}</strong>
				</p>
			</div>
		);
	}

	static renderLeague(props, state, handleSearch) {
		return props.league.data && props.league.data.league_name ? (
			<React.Fragment>
				{LeaguePage.renderLeagueTitle(props)}
				<Divider />
				{LeaguePage.renderLeagueInfo(props)}
				{LeaguePage.renderPlayerTeams(props)}
				{LeaguePage.renderStats(props)}
				{LeaguePage.renderPlayers(props, state, handleSearch)}
				{LeaguePage.renderFooter()}
			</React.Fragment>
		) :  null;
	}

	static renderPlayerTeams(props) {
		if(!props.playerTeamFromLeague.length) {
			return LeaguePage.renderNoTeams(props);
		}

		return (
			<Segment raised>
				<Label
					color='olive'
					ribbon
					className={`${className}__Info__Ribbon`}
				>
					{'Your Teams'}
				</Label>
				<div className={`${className}__Teams__Container`}>
					<Card.Group>
						{props.playerTeamFromLeague.map(team =>
							<PlayerTeam
								key={team.team_id}
								leagueId={props.league.data.league_id}
								team={team}
								cardColor={'green'}
								loadLeague={props.loadLeague}
								loadUser={props.loadUser}
								user={props.user.data}
								price={formatPrice(props.league.data.price)}
								leagueType={props.league.data.league_type}
								leagueIsActive={props.league.data.is_active}
							/>
						)}
						{LeaguePage.renderAddTeam(props)}
					</Card.Group>
				</div>
			</Segment>
		);
	}

	static renderStats(props) {
		return props.leagueStats ? (
			<Segment raised>
				<Label
					color={'blue'}
					ribbon
					className={`${className}__Info__Ribbon`}
				>
					{"Stats"}
				</Label>
				<LeagueStats
					leagueStats={props.leagueStats}
				/>
			</Segment>
		) : null;
	}

	static renderPlayers(props, state, handleSearch) {
		return  (
			<LeaguePlayers
				playersCount={props.leaguePlayers.length}
				players={state.leaguePlayers}
				handleSearch={handleSearch}
			/>
		);
	}

	static renderNoTeams(props) {
		return props.canCreateTeam ? (
			<Segment raised>
				<Label
					color='olive'
					ribbon
					className={`${className}__Info__Ribbon`}
				>
					{'Your Teams'}
				</Label>
				<div className={`${className}__Teams__Container`}>
					<Card.Group>
						{LeaguePage.renderAddTeam(props)}
					</Card.Group>
				</div>
			</Segment>
		) : null;
	}

	static renderAddTeam(props) {
		return props.canCreateTeam ? (
			<PlayerTeamAdd
				userId={props.user.data.user_id}
				leagueId={props.league.data.league_id}
				loadLeague={props.loadLeague}
				loadUser={props.loadUser}
			/>
		) : null;
	}

	static renderFooter() {
		return <div className={`${className}__Footer`}/>;
	}

	static renderMeta(props) {
		const isLeagueActive = !!props.league.data.is_active;
		const isFree = props.league.data.league_type === 'FREE';
		const price = isFree ? 'Free' : `$${props.league.data.price}`;

		return (
			<div className={`${className}__Pricing`}>
				{LeaguePage.renderLeagueStatus(isLeagueActive)}
				<Label
					color={'orange'}
					size={'large'}
				>
					Entry
					<Label.Detail>{formatPrice(price)}</Label.Detail>
				</Label>
				{!isFree ? (
					<Label
						color={'blue'}
						size={'large'}
					>
						Current Pot
						<Label.Detail>{`$${props.league.data.pot}`}</Label.Detail>
					</Label>
				) : null }
			</div>
		)
	}

	static renderLeagueStatus(isLeagueActive) {
		return isLeagueActive ? (
			<Label
				color={'green'}
				size={'large'}
			>
				{'Open'}
			</Label>
		) : (
			<Label
				size={'large'}
				className={`${className}__Dont`}
			>
				<Icon
					size={'large'}
					name={'dont'}
					className={`${className}__Dont__Icon`}
					color={'red'}
					fitted
				/>
			</Label>
		)
	}

	render() {
		const props = this.props;
		return (
			<React.Fragment>
				<Navbar>
					<Link
						to={'/dashboard'}
						className={'Navbar__Link'}
					>
						{"Dashboard"}
					</Link>
					<Profile
						currentPage={'/league'}
					/>
				</Navbar>
				<div className={className}>
					<div className={`${className}__Content`}>
						<Container>
							{LeaguePage.renderLeague(props, this.state, this.handlePlayerSearch)}
						</Container>
					</div>
					<Footer />
				</div>
			</React.Fragment>
		);
	}
}

export default LeaguePage;

function formatPrice(price) {
	return price = price.replace(/\.00$/,'');
}
