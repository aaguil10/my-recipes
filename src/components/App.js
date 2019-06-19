import React from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import "typeface-roboto";
import axios from "axios";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Auth from "../Auth/Auth.js";
import Utils from "../Utils";

/* Footer */
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CardGrid from "./CardGrid";
import TopBar from "./TopBar";
import DataHandler from "../DataHandler";

const GET_RECIPES_URL = Utils.getApiUrl() + "/recipe/getrecipes";

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
  }
}));

const App = () => {
  const classes = useStyles();
  const [recipeList, setRecipeList] = React.useState([]);
  const [initialized, setInitialized] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let data = DataHandler.getRecipeList(dataCallcack);
    if (data.length !== 0) {
      setIsLoading(false);
    }
    setRecipeList(data);
    setInitialized(true);
  }, [initialized]);

  function dataCallcack(data) {
    setIsLoading(false);
    setRecipeList(data);
  }

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
    const user_id = localStorage.getItem("user_id");
    axios.post(GET_RECIPES_URL, { user_id: user_id }).then(({ data }) => {
      setRecipeList(data);
    });
  };

  const handleLogOutClick = () => {
    const auth = new Auth();
    auth.logout();
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <TopBar
        handleAddClick={handleAddClick}
        handleLogOutClick={handleLogOutClick}
        isLoading={isLoading}
      />

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
