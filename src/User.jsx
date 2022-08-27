import React,{useState} from "react";
import { onAuthStateChanged,signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useHistory } from "react-router-dom";
const User = () => {
  let history = useHistory();
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const logoutUser = async () => {
    await signOut(auth);
    history.push("/login");
  };
  return (
    <div>
      <h2>{user? user.email: "User Not Found.Please login or sign up"}</h2>
      <button onClick={logoutUser} disabled={user? false : true}>Log out</button>
    </div>
  );
};

export default User;
