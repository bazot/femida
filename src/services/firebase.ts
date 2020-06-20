import firebase from "@firebase/app";

export const config = {
  apiKey: "AIzaSyCAtsGbUjXwY52ZG0tQKxQvHzxx00Ak5JY",
  authDomain: "femida-project.firebaseapp.com",
  databaseURL: "https://femida-project.firebaseio.com",
  projectId: "femida-project",
  storageBucket: "femida-project.appspot.com",
  messagingSenderId: "246698672460",
  appId: "1:246698672460:web:b9ba7dcbd707a12b3d0fe9",
  measurementId: "G-Q5L9ELJGMN"
};

export default firebase.initializeApp(config);
