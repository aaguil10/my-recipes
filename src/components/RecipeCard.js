import React from "react";

import RecipeCardDisplay from "./RecipeCardDisplay.js";
import RecipeCardForm from "./RecipeCardForm.js";

const RecipeCard = props => {
  const [editMode, setEditMode] = React.useState(false);

  const handleEditClick = value => {
    setEditMode(!editMode);
    props.handleEditClick(value);
  };

  const handleSaveClick = value => {
    setEditMode(!editMode);
    props.handleSaveClick(value);
  };

  function Card(value) {
    if (editMode) {
      return (
        <RecipeCardForm
          key={props.recipeData.id}
          recipeData={props.recipeData}
          onClick={handleSaveClick}
        />
      );
    } else {
      return (
        <RecipeCardDisplay
          key={props.recipeData.id}
          recipeData={props.recipeData}
          onClick={handleEditClick}
        />
      );
    }
  }

  return <Card />;
};

export default RecipeCard;
