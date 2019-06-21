import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import DataHandler from "../DataHandler";
import Auth from "../Auth/Auth";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  avatarIconBtn: {
    margin: 0,
    padding: 0,
    marginLeft: theme.spacing(1)
  },
  profile_large: {
    width: 80,
    height: 80
  },
  profile_info: { marginLeft: theme.spacing(1) }
});

const DialogContent = withStyles(styles)(props => {
  const { children, classes } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Grid container>
        <Grid item>
          <Avatar
            alt="Profile Image"
            className={classes.profile_large}
            src={props.url}
          />
        </Grid>
        <Grid item className={classes.profile_info}>
          {children}
        </Grid>
      </Grid>
    </MuiDialogTitle>
  );
});

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

class Profile extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleLogOut = () => {
    const auth = new Auth();
    auth.logout();
    this.setState({ open: false });
  };

  render() {
    const classes = withStyles(styles);
    const img_url = DataHandler.getProfileURL();
    const name = DataHandler.getUserFLName();
    const email = DataHandler.getUserEmail();
    return (
      <div>
        <IconButton
          onClick={this.handleClickOpen}
          className={classes.avatarIconBtn}
        >
          <Avatar alt="Profile Image" src={img_url} />
        </IconButton>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogContent url={img_url} onClose={this.handleClose}>
            <Typography variant="h6" className={classes.name}>
              {name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.email}
            >
              {email}
            </Typography>
          </DialogContent>
          <Divider />

          <DialogActions>
            <Button onClick={this.handleLogOut} color="primary">
              Sign Out
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Profile;
