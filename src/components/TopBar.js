import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "typeface-roboto";
/* App Bar */
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import LogOutIcon from "@material-ui/icons/ExitToApp";
import Logo from "./Logo";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundImage: "linear-gradient(to right, #fdd835, #ffd600)"
  },
  appTitle: {
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  appLogo: {
    marginRight: theme.spacing(0)
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
      display: "block"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  searchIconMobile: {
    height: "100%",
    position: "relative",
    marginLeft: 0,
    alignItems: "center",
    justifyContent: "center",
    display: "block",
    color: "#ffffff",
    [theme.breakpoints.up("sm")]: {
      display: "none",
      marginLeft: theme.spacing(1)
    }
  },
  addIconMobile: {
    height: "100%",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    display: "none",
    color: "#ffffff",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      marginLeft: theme.spacing(2)
    }
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
}));

const TopBar = props => {
  const classes = useStyles();

  const handleAddClick = () => {
    props.handleAddClick();
  };

  const handleLogOutClick = () => {
    props.handleLogOutClick();
  };

  let Progress = props.isLoading ? <LinearProgress /> : null;

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar>
        <div className={classes.appLogo}>
          <Logo color="#ffffff" width="48" height="48" />
        </div>
        <Typography className={classes.appTitle} variant="h4" noWrap>
          Grub Note
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
          />
        </div>
        <IconButton className={classes.searchIconMobile} aria-label="Search">
          <SearchIcon />
        </IconButton>
        <IconButton
          className={classes.addIconMobile}
          aria-label="Add"
          onClick={handleAddClick}
        >
          <AddIcon />
        </IconButton>
        <IconButton onClick={handleLogOutClick}>
          <LogOutIcon />
        </IconButton>
      </Toolbar>
      {Progress}
    </AppBar>
  );
};
export default TopBar;
