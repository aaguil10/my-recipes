import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./components/App";
import Login from "./components/Login";
import Callback from "./components/Callback";
import Auth from "./Auth/Auth.js";

function AppRouter() {
  const auth = new Auth();
  return (
    <Router>
      <div>
        <Route
          path="/"
          exact
          component={auth.isAuthenticated() ? App : Login}
        />
        <Route path="/login" component={Login} />
        <Route path="/callback" component={Callback} />
      </div>
    </Router>
  );
}

export default AppRouter;
