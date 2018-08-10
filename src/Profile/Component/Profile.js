import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
import { Image, Dropdown, Icon } from 'semantic-ui-react';

import userSelector from "../../Common/Auth/Selector/userSelector";
import authSelector from "../../Common/Auth/Selector/authSelector";

const className = "Profile";

@connect(
	state => ({
		user: userSelector(state),
		auth: authSelector(state),
	})
)
class Profile extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
			shouldRedirect: false
		};
	}

	goToRedirect() {
		this.setState({
			shouldRedirect: true,
		});
	}

	static renderUserImage(props) {
		return props.user && props.user.picture_url ?
			<Image src={props.user.picture_url} avatar /> :
			<Icon name={'user'} />;
	}

	static renderDisplayName(props) {
		return props.user && props.user.full_name ? props.user.full_name : null;
	}

	static renderLogout(props) {
		return (
			<Dropdown.Item onClick={props.onLogoutClick}>
				{"Log Out"}
			</Dropdown.Item>
		);
	}

	static renderAdminLink(props, goToRedirect) {
		return props.user && props.user.is_admin ? (
			<Dropdown.Item onClick={goToRedirect}>
				{props.redirectLabel}
			</Dropdown.Item>
		) : null;
	}

	render() {
		const props = this.props;

		if(this.state.shouldRedirect) {
			return (
				<Redirect to={props.redirectLink} />
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
						{Profile.renderAdminLink(props, this.goToRedirect)}
						{Profile.renderLogout(props)}
					</Dropdown.Menu>
				</Dropdown>
			</div>
		);
	}
}

Profile.propTypes = {
	redirectLink: PropTypes.string.isRequired,
	redirectLabel: PropTypes.string.isRequired,
};
export default Profile;
