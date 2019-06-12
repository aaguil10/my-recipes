import React, { Component } from "react";
import Auth from "../Auth/Auth.js";

class Callback extends Component {
  componentDidMount = () => {
    // Handle authentication if expected values are in the URL.
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      const auth = new Auth();
      auth.handleAuthentication();
    } else {
      throw new Error("Invalid callback URL.");
    }
  };
  render() {
    return <div>Loading...</div>;
  }
}

export default Callback;
