import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC3nOz9sMy3Y9QMS7ehHMvx5RXuzGqa7wU",
  authDomain: "auth-13b2a.firebaseapp.com",
  projectId: "auth-13b2a",
  storageBucket: "auth-13b2a.appspot.com",
  messagingSenderId: "12804098068",
  appId: "1:12804098068:web:9348b3e2964a88cb0e3f01",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
