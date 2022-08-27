import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userData } from "./atoms";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
const SignUp = () => {
  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [userAction, setUserAction] = useRecoilState(userData);

  useEffect(() => {
    console.log(userAction);
  }, [userAction]);
  const submitUser = () => {
    let newUser = {
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(userAction);

    setUserAction([...userAction, newUser]);
    sendUserData();
  };

  const sendUserData = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={(e) => e.preventDefault()}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter name"
              ref={nameRef}
              onKeyUp={(e) => {
                nameRef.current.value = e.target.value;
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Surname</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter name"
              ref={surnameRef}
              onKeyUp={(e) => {
                surnameRef.current.value = e.target.value;
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              ref={emailRef}
              onKeyUp={(e) => {
                emailRef.current.value = e.target.value;
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              ref={passwordRef}
              onKeyUp={(e) => {
                passwordRef.current.value = e.target.value;
              }}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitUser}
            >
              <Link
                to="/login"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  width: "100%",
                  height: "100%",
                  display: "block",
                }}
              >
                Submit
              </Link>
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            You have account <Link to="/login">Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
