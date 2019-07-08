import React from "react";
import Grid from "@material-ui/core/Grid";
import RecipeCardDisplay from "./RecipeCardDisplay.js";

const CardGrid = props => {

  const handleSaveClick = value => {
    props.handleSaveClick(value);
  };

  return (
    <Grid container spacing={8} alignItems="center" justify="center">
      {props.recipeList.map(value => (
        <Grid key={value.id} item>
          <RecipeCardDisplay
            key={value.id}
            recipeData={value}
            handleSaveClick={handleSaveClick}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGrid;
