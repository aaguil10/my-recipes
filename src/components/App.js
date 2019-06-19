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

  React.useEffect(() => {
    if (!initialized) {
      const user_id = localStorage.getItem("user_id");
      const access_token = localStorage.getItem("access_token");
      var config = {
        headers: {
          Authorization: "Bearer " + access_token
        }
      };
      let data = JSON.parse(localStorage.getItem("recipe_list"));
      if (data != undefined) {
        setRecipeList(data);
      } else {
        axios
          .post(
            GET_RECIPES_URL,
            {
              user_id: user_id,
              token: localStorage.getItem("jwt").split("=")[1]
            },
            config
          )
          .then(({ data }) => {
            localStorage.setItem("recipe_list", JSON.stringify(data));
            setRecipeList(data);
          });
      }

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
