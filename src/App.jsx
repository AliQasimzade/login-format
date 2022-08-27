import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "./App.css";
import Login from "./Login";
import SignUp from "./SignUp";
import User from "./User";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/user">
            <User />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
