import firebase from "@firebase/app";
import "@firebase/auth";
import { FirebaseAuth } from "@firebase/auth-types";

const config = {
  apiKey: "AIzaSyCAtsGbUjXwY52ZG0tQKxQvHzxx00Ak5JY",
  authDomain: "femida-project.firebaseapp.com",
  databaseURL: "https://femida-project.firebaseio.com",
  projectId: "femida-project",
  storageBucket: "femida-project.appspot.com",
  messagingSenderId: "246698672460",
  appId: "1:246698672460:web:b9ba7dcbd707a12b3d0fe9",
  measurementId: "G-Q5L9ELJGMN"
};

class Auth {
  public auth: FirebaseAuth;
  constructor() {
    const app = firebase.initializeApp(config);
    if (!app.auth) {
      throw new Error("FirebaseAuth not imported");
    }
    this.auth = app.auth();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password: string) => {
    if (this.auth.currentUser) {
      this.auth.currentUser.updatePassword(password);
    }
  };
}

export default Auth;
