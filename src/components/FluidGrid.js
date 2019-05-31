import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import RecipeCardDisplay from "./RecipeCardDisplay.js";
import RecipeCardForm from "./RecipeCardForm.js";
import myData from "./recipes.json";

function buildObj(arr) {
	const result = [];
	for (const i in arr) {
		const curr = arr[i];
		const recipe = {
			id: curr.id,
			title: curr.title,
			shortNote: curr.note,
			ingredients: curr.ingredients,
			steps: curr.steps
		};
		result.push(recipe);
	}
	return result;
}

const GuttersGrid = props => {
	//const classes = styles();
	const [recipes, setRecipes] = React.useState(buildObj(myData));
	const [editMode, setEditMode] = React.useState(
		Array(myData.length).fill(false)
	);

	const handleEditClick = value => {
		const newEditMode = editMode.slice();
		newEditMode[value.id] = !newEditMode[value.id];
		setEditMode(newEditMode);
	};

	const handleSaveClick = value => {
		const newEditMode = editMode.slice();
		newEditMode[value.id] = !newEditMode[value.id];
		setEditMode(newEditMode);

		const newRecepies = [];
		for (const curr in recipes) {
			if (recipes[curr].id == value.id) {
				newRecepies.push(value);
			} else {
				newRecepies.push(recipes[curr]);
			}
		}
		setRecipes(newRecepies);
	};

	function getCard(value) {
		console.log("getCard title: " + value.title);
		if (editMode[value.id]) {
			return (
				<RecipeCardForm recipeData={value} onClick={handleSaveClick} />
			);
		} else {
			return (
				<RecipeCardDisplay
					recipeData={value}
					onClick={handleEditClick}
				/>
			);
		}
	}

	return (
		<Grid container spacing={8} alignItems="center" justify="center">
			{recipes.map(value => (
				<Grid key={value.id} item>
					{getCard(value, editMode[value.id])}
				</Grid>
			))}
		</Grid>
	);
};

GuttersGrid.propTypes = {
	classes: PropTypes.object.isRequired
};

export default GuttersGrid;
