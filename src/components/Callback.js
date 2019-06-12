import React, { Component } from "react";
import Auth from "../Auth/Auth.js";
import { Redirect } from "react-router-dom";

class Callback extends Component {
  state = {
    target: ""
  };

  componentDidMount = () => {
    // Handle authentication if expected values are in the URL.
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      const auth = new Auth();
      const target = auth.handleAuthentication();
      this.setState({
        target: <Redirect to={target} />
      });
    } else {
      throw new Error("Invalid callback URL.");
    }
  };

  render() {
    return <div>{this.state.target} Loading...</div>;
  }
}

export default Callback;
