import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

import RecipeCardDisplay from "./RecipeCardDisplay.js";
import RecipeCardForm from "./RecipeCardForm.js";

const GuttersGrid = props => {
	console.log("Rendering GuttersGrid");

	console.log(props.recipeList);
	console.log(props.editMode);

	const handleEditClick = value => {
		props.handleEditClick(value);
	};

	const handleSaveClick = value => {
		props.handleSaveClick(value);
	};

	function getCard(value) {
		if (props.editMode[value.id]) {
			return (
				<RecipeCardForm
					key={value.id}
					recipeData={value}
					onClick={handleSaveClick}
				/>
			);
		} else {
			return (
				<RecipeCardDisplay
					key={value.id}
					recipeData={value}
					onClick={handleEditClick}
				/>
			);
		}
	}

	return (
		<Grid container spacing={8} alignItems="center" justify="center">
			{props.recipeList.map(value => (
				<Grid key={value.id} item>
					{getCard(value)}
				</Grid>
			))}
		</Grid>
	);
};

GuttersGrid.propTypes = {
	classes: PropTypes.object.isRequired
};

export default GuttersGrid;
