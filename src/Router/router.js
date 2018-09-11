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
import AdminDashboard from "../Admin/Component/AdminDashboard";
import LeaguePage from "../League/Component/LeaguePage";
import PlayerTeamPage from "../PlayerTeam/Component/PlayerTeamPage";
import SettingsPage from "../Profile/Component/SettingsPage";
import MessagesPage from "../Messages/Component/MessagesPage";

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

const AdminRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		(store.getState().user.data && store.getState().user.data.is_admin) ? (
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
			<ProtectedRoute path="/dashboard" component={Dashboard}/>
			<AdminRoute path="/admin" component={AdminDashboard}/>
			<ProtectedRoute path={"/league/:league_id/team/:team_id"} component={PlayerTeamPage} />
			<ProtectedRoute path={"/league/:league_id"} component={LeaguePage} />
			<ProtectedRoute path={"/settings"} component={SettingsPage}/>
			<ProtectedRoute path={"/messages"} component={MessagesPage} />
		</Switch>
	</ConnectedRouter>
);