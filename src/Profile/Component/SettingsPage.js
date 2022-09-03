import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Segment, Container, Checkbox } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { withToastManager } from "react-toast-notifications";

import Navbar from "../../Navbar/Component/Navbar";
import Profile from "../../Profile/Component/Profile";

import UserDecorator from "../../Common/Auth/Decorator/UserDecorator";
import LoaderDecorator from "../../Common/Loader/Component/LoaderDecorator";

const className = "SettingsPage";

@withToastManager
@UserDecorator
@LoaderDecorator
class SettingsPage extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	handleNotificationClick() {
		this.props.setNotification({
			user_id: this.props.user.data.id,
			receive_notifications: !this.props.user.data.receive_notifications,
		})
			.then(this.onSettingsSuccess)
			.catch(this.onSettingsFailure);
	}

	onSettingsSuccess() {
		const { toastManager } = this.props;
		toastManager.add(`Setting Saved Successfully`, { appearance: 'success', autoDismiss: true });
		this.props.loadUser();
	}

	onSettingsFailure() {
		const { toastManager } = this.props;
		toastManager.add('Oh no, something terrible happened!', { appearance: 'error' });
		this.props.loadUser();
	}

	renderSettings() {
		const receiveNotifications = this.props.user.data && this.props.user.data.receive_notifications;

		return (
			<Segment
				raised
			>
				<h3>{"Sometimes we'll want to send you emails"}</h3>
				<p>{"Like when you're eliminated or we have some awesome news. It's enabled by default but you can turn this off."}</p>
				<Checkbox
					toggle
					label={'Enable email notifications'}
					onClick={this.handleNotificationClick}
					checked={receiveNotifications}
				/>
			</Segment>
		)
	}

	render() {
		return (
			<div className={className}>
				<Navbar>
					<Link
						to={'/dashboard'}
						className={'Navbar__Link'}
					>
						{"Dashboard"}
					</Link>
					<Profile
						currentPage={'/settings'}
					/>
				</Navbar>
				<div className={`${className}__Content`}>
					<Container>
						<div className={`${className}__Header__Container`}>
							<h1 className={`${className}__Header`}>
								{"Settings"}
							</h1>
						</div>
						{this.renderSettings()}
					</Container>
				</div>
			</div>
		);
	}
}

export default SettingsPage;
