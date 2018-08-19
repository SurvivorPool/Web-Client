import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactModal from "react-modal";
import { ToastProvider } from 'react-toast-notifications';
import Raven from 'raven-js';
import firebase from "firebase/app";
import "firebase/auth";

import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './configureStore';
import { setToken } from "./Common/Util/Requests";

import userAuthTokenAction from './Common/Auth/Action/userAuthTokenAction';

import router from "./Router/router";
import Analytics from "./Common/Analytics/Analytics";

Analytics.initLibraries();

ReactModal.setAppElement('#root');

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASEDATABASE_URL,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER
};

try {
	firebase.initializeApp(config);
} catch (e) {
	Raven.captureException(e);
};

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		firebase.auth().currentUser.getIdToken(true).then(token => {
			setToken(token);
			store.dispatch(userAuthTokenAction(token));
		});
	}
});

Raven.context(() => {
    ReactDOM.render(
		<ToastProvider
			placement={'bottom-right'}
			autoDismissTimeout={6000}
		>
			<Provider store={store}>
				{router}
			</Provider>
		</ToastProvider>, document.getElementById('root'));
    registerServiceWorker();
});
