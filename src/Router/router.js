import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from 'react-router-dom';

import LandingPage from '../LandingPage/Component/LandingPage';

export default (
	<Router>
		<Switch>
			<Route exact path="/" component={LandingPage}/>
		</Switch>
	</Router>
);