import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import TextField from "@material-ui/core/TextField";

import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";

import IngredientItem from "./IngredientItem.js";
import StepItem from "./StepItem.js";

const useStyles = makeStyles(theme => ({
  card: {
    width: "100%"
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
    padding: 0,
    width: "100%"
  }
}));

function buildIngredientObj(ingredients) {
  let ingredientObjs = [];
  for (let id = 0; id < ingredients.length; id++) {
    ingredientObjs.push({ id: id, value: ingredients[id] });
  }
  return ingredientObjs;
}

function buildStepObj(steps) {
  let stepObjs = [];
  for (let id = 0; id < steps.length; id++) {
    stepObjs.push({ id: id, value: steps[id] });
  }
  return stepObjs;
}

function RecipeCardDisplay(props) {
  const classes = useStyles();
  const [title, setTitle] = React.useState(props.recipeData.title);
  const [note, setNote] = React.useState(props.recipeData.shortNote);
  const [ingredients, setIngredients] = React.useState(
    buildIngredientObj(props.recipeData.ingredients)
  );
  const [steps, setSteps] = React.useState(
    buildStepObj(props.recipeData.steps)
  );

  function handleAddIngredient() {
    const newIngredients = ingredients.slice();
    newIngredients.push({ id: ingredients.length, value: "" });
    setIngredients(newIngredients);
  }

  const handleRemoveIngregient = val => {
    const newIngredients = [];
    for (let i = 0; i < ingredients.length; i++) {
      if (ingredients[i].id !== val.id) {
        newIngredients.push(ingredients[i]);
      }
    }
    setIngredients(newIngredients);
  };

  function handleAddStep() {
    const newSteps = steps.slice();
    newSteps.push({ id: steps.length, value: "" });
    setSteps(newSteps);
  }

  const handleRemoveStep = val => {
    const newSteps = [];
    for (let i = 0; i < steps.length; i++) {
      if (steps[i].id !== val.id) {
        newSteps.push(steps[i]);
      }
    }
    setSteps(newSteps);
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
        />
        <TextField
          id="filled-bare"
          label="Short Note"
          className={classes.textField}
          defaultValue={note}
          margin="normal"
          variant="filled"
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
          <IconButton aria-label="Add Step" onClick={handleAddStep}>
            <AddIcon />
          </IconButton>
        </Typography>
        {steps.map(step => (
          <StepItem
            key={step.id}
            id={step.id}
            value={step.value}
            onClick={handleRemoveStep}
          />
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