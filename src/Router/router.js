import React from 'react';
import {
	Route,
	Redirect,
	Switch
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from '../configureStore';

import LandingPage from '../LandingPage/Component/LandingPage';
import Dashboard from '../Dashboard/Component/Dashboard';

const ProtectedRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		(store.getState().auth.data && store.getState().auth.data.isLoggedIn) ? (
			<Component {...props} />
		) : (
			<Redirect to={{
				pathname: '/'
			}} />
		)
	)} />
);

export default (
	<ConnectedRouter history={history}>
		<Switch>
			<Route exact path="/" component={LandingPage}/>
			<ProtectedRoute exact path="/dashboard" component={Dashboard}/>
		</Switch>
	</ConnectedRouter>
);