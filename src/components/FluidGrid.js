import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";

import RecipeCardDisplay from "./RecipeCardDisplay.js";
import RecipeCardForm from "./RecipeCardForm.js";
import myData from "./recipes.json";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  }
});

class GuttersGrid extends React.Component {
  state = {
    spacing: "8",
    recepies: myData,
    editMode: Array(myData.length).fill(false)
  };

  render() {
    console.log("Rendering....");
    const { classes } = this.props;
    const { spacing } = this.state;

    const handleEditClick = value => {
      const newEditMode = this.state.editMode.slice();
      newEditMode[value.id] = !newEditMode[value.id];
      this.state.editMode = newEditMode;

      this.setState({ editMode: newEditMode });
    };

    myData.forEach(value => {
      setCard(value, this.state.editMode[value.id]);
    });

    function setCard(value, editMode) {
      if (editMode) {
        value.card = (
          <RecipeCardForm
            recipeData={value}
            className={classes.paper}
            onClick={handleEditClick}
          />
        );
      } else {
        value.card = (
          <RecipeCardDisplay
            recipeData={value}
            className={classes.paper}
            onClick={handleEditClick}
          />
        );
      }
    }

    return (
      <Grid
        container
        className="content-wrapper"
        spacing={8}
        alignItems="center"
      >
        <Grid item xs={12}>
          <Grid
            container
            className={classes.demo}
            justify="center"
            spacing={Number(spacing)}
          >
            {myData.map(value => (
              <Grid key={value.id} item>
                {value.card}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

GuttersGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GuttersGrid);
