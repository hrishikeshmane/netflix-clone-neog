import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAsxsGDo-ecp5Pk-MX-L4NC04xzYn2ykBU",
  authDomain: "netflix-clone-45aa1.firebaseapp.com",
  projectId: "netflix-clone-45aa1",
  storageBucket: "netflix-clone-45aa1.appspot.com",
  messagingSenderId: "346204853942",
  appId: "1:346204853942:web:d86b7d6f298f037b60b817",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
