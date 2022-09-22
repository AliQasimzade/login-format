import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userData } from "../store/atoms";
import { useRecoilValue } from "recoil";
import { auth } from "../firebase/firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { GoogleButton } from "react-google-button";

const Login = () => {
  const emailRef = useRef("");
  const passWordRef = useRef("");
  const linkRef = useRef("");
  const [user, setUser] = useState([]);
  const Users = useRecoilValue(userData);
  let navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passWordRef.current.value
      );

      alert("Success");
      navigate("/user")
    } catch (error) {
      alert(error);
    }
  };
  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
       await signInWithPopup(auth, provider);
      alert("Success");
      navigate("/user")
    } catch (error) {
      console.log(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email:
        Users[Users.length - 1] === undefined
          ? emailRef.current.value
          : Users[Users.length - 1].email,
      password:
        Users[Users.length - 1] === undefined
          ? passWordRef.current.value
          : Users[Users.length - 1].password,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("*Invalid email address")
        .max(23, "*Must be 23 characters or less")
        .required("*Required"),

      password: Yup.string()
        .max(20, "*Must be 8-16 characters or less")
        .min(8, "*Must be 8-16 characters or less")
        .required("*Required"),
    }),
    onSubmit: (values) => {
      if (
        /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)(\@gmail.com|@mail.ru|@list.ru|@yahoo.com|@box.az)/g.test(
          values.email
        ) === true &&
        /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)/g.test(values.password) === true
      ) {
        let newUser = {
          email: emailRef.current.value,
          password: passWordRef.current.value,
        };
        setUser([...user, newUser]);

        login();
      }
    },
  });
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={formik.handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
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
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              id="email"
            />
            {formik.touched.email && formik.errors.email ? (
              <p style={{ color: "red" }}>{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              ref={passWordRef}
              onKeyUp={(e) => {
                passWordRef.current.value = e.target.value;
              }}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              id="password"
            />
            {formik.touched.password && formik.errors.password ? (
              <p style={{ color: "red" }}>{formik.errors.password}</p>
            ) : null}
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" ref={linkRef}>
              Login
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            <Link to="/signup">Signup</Link>
          </p>
          <div className="forgot-password text-right mt-2">
            <GoogleButton onClick={googleSignIn} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
