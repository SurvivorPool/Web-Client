import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
import { Image, Dropdown, Icon } from 'semantic-ui-react';

import UserDecorator from "../../Common/Auth/Component/UserDecorator";
import AuthDecorator from "../../Common/Auth/Component/AuthDecorator";

const className = "Profile";

const links = {
	dashboard: '/dashboard',
	admin: '/admin',
	league: '/league',
};

@AuthDecorator
@UserDecorator
class Profile extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
			shouldRedirect: false,
			redirectLink: null,
		};
	}

	goToRedirect(redirectLink) {
		this.setState({
			shouldRedirect: true,
			redirectLink,
		});
	}

	static renderUserImage(props) {
		return props.auth.data && props.auth.data.pictureURL ?
			<Image src={props.auth.data.pictureURL} avatar /> :
			<Icon name={'user'} />;
	}

	static renderDisplayName(props) {
		return props.user.data && props.user.data.full_name ? props.user.data.full_name : null;
	}

	static renderLogout(props) {
		return (
			<Dropdown.Item onClick={props.logout}>
				{"Log Out"}
			</Dropdown.Item>
		);
	}

	renderAdminLink(props) {
		return canShowAdmin(props) ? (
			<Dropdown.Item onClick={() => this.goToRedirect('/admin')}>
				{"Admin Dashboard"}
			</Dropdown.Item>
		) : null;
	}

	renderDashboardLink(props) {
		return canShowDashboard(props) ? (
			<Dropdown.Item onClick={() => this.goToRedirect('/dashboard')}>
				{"Dashboard"}
			</Dropdown.Item>
 		) : null;
	}

	render() {
		const props = this.props;

		if(this.state.shouldRedirect) {
			return (
				<Redirect to={this.state.redirectLink} />
			)
		}

		return (
			<div className={`${className}__Container`}>
				{Profile.renderUserImage(props)}
				<Dropdown
					className={`${className}__Menu icon`}
					text={Profile.renderDisplayName(props)}
					labeled
				>
					<Dropdown.Menu>
						{this.renderDashboardLink(props)}
						{this.renderAdminLink(props)}
						{Profile.renderLogout(props)}
					</Dropdown.Menu>
				</Dropdown>
			</div>
		);
	}
}

Profile.propTypes = {
	currentPage: PropTypes.string.isRequired,
};

export default Profile;

function canShowDashboard(props) {
	return props.currentPage !== links.dashboard && props.currentPage !== links.league
}

function canShowAdmin(props) {
	return props.currentPage !== links.admin && props.user.data && props.user.data.is_admin;
}