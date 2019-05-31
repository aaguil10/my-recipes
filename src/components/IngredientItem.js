import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles(theme => ({
  box: {
    margin: 0,
    padding: 0
  },
  textField: {
    margin: 0,
    padding: 0
  }
}));

function IngredientItem(props) {
  const classes = useStyles();

  const handleRemoveClick = () => {
    props.onClick(props);
  };

  const handleOnChange = val => {
    const res = { id: props.id, value: val };
    props.onChange(res);
  };

  return (
    <Box display="flex" p={1} alignItems="center" className={classes.box}>
      <Box p={1} flexGrow={1} className={classes.box}>
        <TextField
          id="filled-bare"
          label="Ingredient"
          className={classes.textField}
          defaultValue={props.value}
          onChange={e => handleOnChange(e.target.value)}
          margin="normal"
          variant="filled"
          style={{ width: "100%" }}
        />
      </Box>
      <Box p={0} className={classes.box}>
        <IconButton aria-label="Remove Ingredient" onClick={handleRemoveClick}>
          <ClearIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default IngredientItem;
