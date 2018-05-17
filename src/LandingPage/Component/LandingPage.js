import React, { Component } from 'react';
import { Header, Container, Image } from 'semantic-ui-react';
import logo from '../../Assets/Images/logo.png';
import './_LandingPage.scss';

const className = "LandingPage";

class LandingPage extends Component {
	render() {
		return (
			<div className={className}>
				<Header>
					{"Survivor Pool"}
				</Header>
				<Image src={logo} size={"small"} />
			</div>
		);
	}
}

export default LandingPage;
