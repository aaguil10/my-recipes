import React, { Component } from "react";
import Auth from "../Auth/Auth.js";
import LogOutIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";

class Error extends Component {
  render() {
    const handleLogOutClick = () => {
      const auth = new Auth();
      auth.logout();
    };

    return (
      <div>
        Error occured...
        <p>
          <IconButton onClick={handleLogOutClick}>
            <LogOutIcon />
          </IconButton>
        </p>
      </div>
    );
  }
}

export default Error;
