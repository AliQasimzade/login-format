import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDkN03PIjpKQXhM34Okt4bdp4Jj3Tg-lDI",
  authDomain: "auth-login-1fe4c.firebaseapp.com",
  projectId: "auth-login-1fe4c",
  storageBucket: "auth-login-1fe4c.appspot.com",
  messagingSenderId: "237077747684",
  appId: "1:237077747684:web:e5114784cb2e4f0ca759f1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
