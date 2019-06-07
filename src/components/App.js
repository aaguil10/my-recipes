import React from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import "typeface-roboto";
import axios from "axios";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

/* App Bar */
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import IconButton from "@material-ui/core/IconButton";

/* Footer */
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CardGrid from "./CardGrid";

const GET_RECIPES_URL =
  "https://us-central1-myrecipes-f34ca.cloudfunctions.net/recipe/getrecipes";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#fffde7"
  },
  main: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    width: "100%"
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: "auto",
    backgroundColor: "#fff9c4"
  },
  addFab: {
    color: "#FFFFFF",
    backgroundColor: "#fdd835",
    "&:hover": {
      backgroundColor: "#fdd835"
    },
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },

  appBar: {
    backgroundImage: "linear-gradient(to right, #fdd835, #ffd600)"
  },

  appTitle: {
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
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

const App = () => {
  const classes = useStyles();
  const [recipeList, setRecipeList] = React.useState([]);
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    if (!initialized) {
      axios.get(GET_RECIPES_URL).then(({ data }) => {
        setRecipeList(data);
      });

      setInitialized(true);
    }
  });

  const handleAddClick = () => {
    const newRecipeList = recipeList.slice();
    const newId = "new" + (newRecipeList.length + 1);
    newRecipeList.push({
      id: newId,
      title: "New Recipe",
      subtitle: "Sub Note",
      ingredients: [],
      steps: [],
      notes: ""
    });
    setRecipeList(newRecipeList);
  };

  const handleSaveClick = value => {
    axios.get(GET_RECIPES_URL).then(({ data }) => {
      setRecipeList(data);
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography className={classes.appTitle} variant="h6" noWrap>
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
          <IconButton className={classes.searchIconMobile} aria-label="Serach">
            <SearchIcon />
          </IconButton>
          <IconButton
            className={classes.addIconMobile}
            aria-label="Add"
            onClick={handleAddClick}
          >
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container component="main" className={classes.main} maxWidth="auto">
        <CardGrid recipeList={recipeList} handleSaveClick={handleSaveClick} />
      </Container>

      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1" className="footer-copyright">
            {" "}
            © {new Date().getFullYear()} Alejandro Aguilar
          </Typography>
        </Container>
      </footer>

      <Fab className={classes.addFab} onClick={handleAddClick}>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default App;
