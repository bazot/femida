import "@firebase/auth";
import { FirebaseAuth } from "@firebase/auth-types";
import firebaseService from "./firebase";

class AuthService {
  auth: FirebaseAuth;
  constructor() {
    if (!firebaseService.auth) {
      throw new Error("FirebaseAuth not imported");
    }
    this.auth = firebaseService.auth();
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

export default new AuthService();
