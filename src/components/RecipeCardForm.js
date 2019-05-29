import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { flexbox } from "@material-ui/system";

import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles(theme => ({
  card: {
    width: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  box: {
    margin: 0,
    padding: 0
  },
  textField: {
    margin: 0,
    padding: 0
  }
}));

function RecipeCardDisplay(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [title, setTitle] = React.useState(props.recipeData.title);
  const [note, setNote] = React.useState(props.recipeData.shortNote);
  const [ingredients, setIngredients] = React.useState(
    props.recipeData.ingredients
  );
  const [steps, setSteps] = React.useState(props.recipeData.steps);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <TextField
          id="filled-bare"
          className={classes.textField}
          defaultValue={title}
          margin="normal"
          variant="filled"
          style={{ width: "100%" }}
        />
        <TextField
          id="filled-bare"
          className={classes.textField}
          defaultValue={note}
          margin="normal"
          variant="filled"
          style={{ width: "100%" }}
        />
        <Typography variant="h6">
          Ingredients{" "}
          <IconButton aria-label="Add Ingredient">
            <AddIcon />
          </IconButton>
        </Typography>
        {ingredients.map(ingredient => (
          <Box display="flex" p={1} alignItems="center" className={classes.box}>
            <Box p={1} flexGrow={1} className={classes.box}>
              <TextField
                id="filled-bare"
                className={classes.textField}
                defaultValue={ingredient}
                margin="normal"
                variant="filled"
                style={{ width: "100%" }}
              />
            </Box>
            <Box p={0} className={classes.box}>
              <IconButton aria-label="Remove Ingredient">
                <ClearIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
        <Typography variant="h6">Steps</Typography>
        {steps.map(step => (
          <Box display="flex" p={1} alignItems="center" className={classes.box}>
            <Box p={1} flexGrow={1} className={classes.box}>
              <TextField
                id="filled-bare"
                className={classes.textField}
                defaultValue={step}
                margin="normal"
                variant="filled"
                multiline
                style={{ width: "100%" }}
              />
            </Box>
            <Box p={0} className={classes.box}>
              <IconButton aria-label="Remove Ingredient">
                <ClearIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Save Recipe">
          <SaveIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default RecipeCardDisplay;
