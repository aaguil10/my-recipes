import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/Save";

import IngredientItem from "./IngredientItem.js";

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

function buildIngredientObj(ingredients) {
  let ingredientObjs = [];
  for (let id = 0; id < ingredients.length; id++) {
    ingredientObjs.push({ id: id, value: ingredients[id] });
  }
  return ingredientObjs;
}

function RecipeCardDisplay(props) {
  const classes = useStyles();
  const [title, setTitle] = React.useState(props.recipeData.title);
  const [note, setNote] = React.useState(props.recipeData.shortNote);
  const [ingredients, setIngredients] = React.useState(
    buildIngredientObj(props.recipeData.ingredients)
  );
  const [steps, setSteps] = React.useState(props.recipeData.steps);

  function handleAddIngredient() {
    const newIngredients = ingredients.slice();
    newIngredients.push({ id: ingredients.length, value: "" });
    setIngredients(newIngredients);
  }

  const handleRemoveIngregient = val => {
    const newIngredients = [];
    console.log(val);
    console.log(ingredients);
    for (let i = 0; i < ingredients.length; i++) {
      if (ingredients[i].id !== val.id) {
        newIngredients.push(ingredients[i]);
      }
    }
    console.log(newIngredients);
    setIngredients(newIngredients);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <TextField
          id="filled-bare"
          label="Name"
          className={classes.textField}
          defaultValue={title}
          margin="normal"
          variant="filled"
          style={{ width: "100%" }}
        />
        <TextField
          id="filled-bare"
          label="Short Note"
          className={classes.textField}
          defaultValue={note}
          margin="normal"
          variant="filled"
          style={{ width: "100%" }}
        />
        <Typography variant="h6">
          Ingredients{" "}
          <IconButton aria-label="Add Ingredient" onClick={handleAddIngredient}>
            <AddIcon />
          </IconButton>
        </Typography>
        {ingredients.map(ingredient => (
          <IngredientItem
            key={ingredient.id}
            id={ingredient.id}
            value={ingredient.value}
            onClick={handleRemoveIngregient}
          />
        ))}
        <Typography variant="h6">
          Steps
          <IconButton aria-label="Add Step">
            <AddIcon />
          </IconButton>
        </Typography>
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
