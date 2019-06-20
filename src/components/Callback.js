import React, { Component } from "react";
import Auth from "../Auth/Auth.js";
import { Redirect } from "react-router-dom";

class Callback extends Component {
  state = {
    target: ""
  };

  componentDidMount = () => {
    let hash = this.props.location.hash;
    // Handle authentication if expected values are in the URL.
    if (/access_token|id_token|error/.test(hash)) {
      if (hash.includes("error")) {
        this.setState({
          target: <Redirect to="/error" err={hash} />
        });
        return;
      }
      const auth = new Auth();
      auth.handleAuthentication(val => {
        let redirect = <Redirect to={val} />;
        this.setState({
          target: redirect
        });
      });
    }
  };

  render() {
    return <div>{this.state.target} Loading...</div>;
  }
}

export default Callback;
