import React, { Component } from 'react';
import { Image  } from 'semantic-ui-react';

import Navbar from "../../Navbar/Component/Navbar";

import logo from 'Images/logo.png';

const className = "LandingPage";
const heroClassName = `${className}__Hero`;
const sectionClassName = `${className}__Section`;

class LandingPage extends Component {
	render() {
		return (
			<div className={className}>
				<Navbar/>
				<header className={heroClassName}>
					<div className={`${heroClassName}__Container`}>
						<Image src={logo} className={`${className}__Hero__Logo`}/>
					</div>
				</header>
				<section className={sectionClassName}>
					<div className={`${sectionClassName}__Content`}>
						<p>{"How it Works Text"}</p>
					</div>
				</section>
			</div>
		);
	}
}

export default LandingPage;
