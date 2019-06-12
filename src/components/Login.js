import React, { Component } from "react";
import Auth from "../Auth/Auth.js";

class Login extends Component {
  render() {
    const auth = new Auth();
    auth.login();
    return <div></div>;
  }
}

export default Login;
