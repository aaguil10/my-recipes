import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

import ClearIcon from "@material-ui/icons/Clear";
import Quantity from "./Quantity";

const useStyles = makeStyles(theme => ({
  box: {
    margin: 0,
    padding: 0
  },
  textField: {
    margin: 0,
    padding: 5
  }
}));

function IngredientItem(props) {
  const classes = useStyles();

  const handleSave = (id, amount, metric) => {
    let name = props.value.name;
    if (name === undefined) {
      name = props.value;
    }
    const res = {
      id: props.id,
      value: { name: name, amount: amount, metric: metric }
    };
    props.onChange(res);
  };

  const handleRemoveClick = () => {
    props.onClick(props);
  };

  const handleOnIngredientChange = val => {
    const res = {
      id: props.id,
      value: {
        name: val,
        amount: props.value.amount,
        metric: props.value.metric
      }
    };
    props.onChange(res);
  };

  let name = props.value.name;
  if (name === undefined) {
    name = props.value;
  }
  return (
    <Box display="flex" p={1} alignItems="center" className={classes.box}>
      <Box p={1} className={classes.box}>
        <Quantity
          amount={props.value.amount}
          metric={props.value.metric}
          handleSave={handleSave}
        />
      </Box>
      <Box p={1} flexGrow={1} className={classes.box}>
        <TextField
          id="filled-bare"
          label="Ingredient"
          className={classes.textField}
          defaultValue={name}
          onChange={e => handleOnIngredientChange(e.target.value)}
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
