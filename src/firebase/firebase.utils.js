import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyB2OtpCCx0QU45Un3-LAkKY5BLACHPHuoA",
  authDomain: "crown-backend-ad7e1.firebaseapp.com",
  projectId: "crown-backend-ad7e1",
  storageBucket: "crown-backend-ad7e1.appspot.com",
  messagingSenderId: "266731416246",
  appId: "1:266731416246:web:6e37b1c19ecccea14d5417",
  measurementId: "G-XZXZ2YJT5K",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
