import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEFbVnFjlSz3KEYyBQBGCBme2TsE4V2oM",
  authDomain: "eventos-at02-react-native.firebaseapp.com",
  databaseURL: "https://eventos-at02-react-native-default-rtdb.firebaseio.com",
  projectId: "eventos-at02-react-native",
  storageBucket: "eventos-at02-react-native.appspot.com",
  messagingSenderId: "144072362793",
  appId: "1:144072362793:web:6faa5bdd3ac885f5378538"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;