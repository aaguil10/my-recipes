import React from "react";
import Grid from "@material-ui/core/Grid";

import RecipeCard from "./RecipeCard.js";

const CardGrid = props => {
  const handleEditClick = value => {
    // const newEditMode = editMode.slice();
    // newEditMode[value.id] = !newEditMode[value.id];
    // setEditMode(newEditMode);
  };

  const handleSaveClick = value => {
    props.handleSaveClick(value);
  };

  return (
    <Grid container spacing={8} alignItems="center" justify="center">
      {props.recipeList.map(value => (
        <Grid key={value.id} item>
          <RecipeCard
            key={value.id}
            recipeData={value}
            handleEditClick={handleEditClick}
            handleSaveClick={handleSaveClick}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGrid;
