import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
			activeItem: 'inbox'
		};
	}
	static renderUserImage(props) {
		return props.user.data && props.user.data.picture_url ?
			<Image src={props.user.data.picture_url} avatar /> :
			<Icon name={'user'} avatar />;
	}
	static renderDisplayName(props) {
		return props.user.data && props.user.data.full_name ? (
			<React.Fragment>
				{Profile.renderUserImage(props)}
				{props.user.data.full_name}
			</React.Fragment>
		) : null;
	}
	static renderLogout(props) {
		return (
			<Dropdown.Item onClick={props.onLogoutClick}>
				{"Log Out"}
			</Dropdown.Item>
		);
	}
	render() {
		const props = this.props;
		return (
			<Dropdown
				className={`${className}__Menu icon`}
				text={Profile.renderDisplayName(props)}
				labeled
			>
				<Dropdown.Menu>
					{Profile.renderLogout(props)}
				</Dropdown.Menu>
			</Dropdown>
		);
	}
}

Profile.propTypes = {
	onLogoutClick: PropTypes.func.isRequired,
};
export default Profile;
