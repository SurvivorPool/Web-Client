import firebase from 'firebase/app';
import 'firebase/auth';

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();

export default firebase;

export function firebaseLogin(provider) {
	return firebase.auth().signInWithPopup(provider)
		.then((results) => {
			return {
				uid: results.user.uid,
				displayName: results.user.displayName,
				email: results.user.email,
				pictureURL: results.user.photoURL
			};
	}).catch(e => {
		if(e.code == 'auth/account-exists-with-different-credential') {
			alert(e.message);
		} else {
			console.log(e.code);
		}

		return Promise.reject();
	});
}