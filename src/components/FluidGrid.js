import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";

import RecipeCard from "./RecipeCard.js";

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
    spacing: "8"
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value
    });
  };

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

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
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
              <Grid key={value} item>
                <RecipeCard className={classes.paper} />
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
