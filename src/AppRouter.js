import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from "./components/App";
import Login from "./components/Login";
import Callback from "./components/Callback";

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={App} />
        <Route path="/login" component={Login} />
        <Route path="/callback" component={Callback} />
      </div>
    </Router>
  );
}

export default AppRouter;
