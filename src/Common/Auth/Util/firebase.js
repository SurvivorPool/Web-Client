import * as firebase from 'firebase/app';
import 'firebase/auth';
import Raven from 'raven-js';

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
}

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();

export default firebase;

export function firebaseLogin(provider) {
	switch(provider) {
		case 'google':
			provider = googleProvider;
			break;
		case 'facebook':
			provider = facebookProvider;
			break;
		default:
			break;
	}

	return firebase.auth().signInWithPopup(provider).then((results) => {
		return {
			uid: results.user.uid,
			displayName: results.user.displayName,
			email: results.user.email,
			pictureURL: results.user.photoURL
		};
	});
}