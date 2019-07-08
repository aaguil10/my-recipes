import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import ClearIcon from "@material-ui/icons/Clear";
import Box from "@material-ui/core/Box";

import Utils from "../Utils";
import IconCup from "./IconCup";

const NumberField = withStyles(theme => ({
  root: {
    marginRight: 10
  }
}))(TextField);

const MetricField = withStyles(theme => ({
  root: {
    margin: 0
  }
}))(TextField);

const CloseIconButton = withStyles(theme => ({
  root: {
    margin: 0
  }
}))(IconButton);

const CustomMetricRow = withStyles(theme => ({
  root: {
    width: 200
  }
}))(Box);

const MetricFormControl = withStyles(theme => ({
  root: {
    margin: 10
  }
}))(FormControl);

class Quantity extends Component {
  state = {
    open: false,
    amount: this.props.amount,
    metric: this.props.metric
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    this.setState({ open: false });
    let m = this.state.metric;
    m = Utils.getUnit(m);
    if (m === 0) {
      m = this.state.metric;
    } else {
      m = m.abbr;
    }
    this.props.handleSave(this.props.id, this.state.amount, m);
  };

  handleAmountChange = event => {
    this.setState({ amount: event.target.value });
  };

  handleMetricChange = event => {
    const val = event.target.value;
    if (val === 0) {
      if (Utils.getUnit(this.state.metric) !== 0) {
        this.setState({ metric: "" });
      } else {
        this.setState({ metric: this.state.metric });
      }
    } else {
      let metric = this.getMetric(val);
      this.setState({ metric: metric.abbr });
    }
  };

  handleRemoveCustom = () => {
    this.setState({ metric: "g" });
  };

  getMetric = value => {
    if (value === 0) {
      return value;
    } else {
      return Utils.getMetric(value);
    }
  };

  getMetricNumber = value => {
    if (Utils.getUnit(value) !== 0) {
      return Utils.getUnit(value).id;
    } else {
      return value;
    }
  };

  render() {
    let custom_metric;
    if (Utils.getUnit(this.state.metric) === 0) {
      custom_metric = (
        <CustomMetricRow display="flex" alignItems="center">
          <Box flexGrow={1}>
            <MetricField
              label="Metric Name"
              value={this.state.metric}
              onChange={e => this.setState({ metric: e.target.value })}
              margin="normal"
            />
          </Box>
          <Box>
            <CloseIconButton
              aria-label="Remove Custom Metric"
              onClick={this.handleRemoveCustom}
            >
              <ClearIcon />
            </CloseIconButton>
          </Box>
        </CustomMetricRow>
      );
    } else {
      custom_metric = (
        <MetricFormControl>
          <InputLabel htmlFor="uncontrolled-native">Metric</InputLabel>
          <Select
            value={this.getMetricNumber(this.state.metric)}
            onChange={this.handleMetricChange}
            input={<Input name="metric" id="uncontrolled-native" />}
          >
            {Utils.getUnits().map(unit => (
              <option key={unit.id} value={unit.id}>
                {unit.unit} ({unit.abbr})
              </option>
            ))}
            <option key={0} value={0}>
              Custom
            </option>
          </Select>
        </MetricFormControl>
      );
    }

    let measureIcon;
    if (
      this.state.amount === 0 ||
      this.state.amount === "0" ||
      this.state.amount === "" ||
      this.state.amount === undefined
    ) {
      measureIcon = <IconCup color="#000000" width="24" height="24" />;
    } else {
      measureIcon = (
        <Typography>
          {this.state.amount} {this.state.metric}
        </Typography>
      );
    }
    return (
      <div>
        <IconButton
          variant="outlined"
          color="inherit"
          onClick={this.handleClickOpen}
        >
          {measureIcon}
        </IconButton>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <MuiDialogContent dividers>
            <>
              <Grid alignItems="center" container>
                <Grid item>
                  <NumberField
                    id="standard-number"
                    label="Number"
                    value={this.state.amount}
                    type="number"
                    width="5px"
                    onChange={this.handleAmountChange}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="normal"
                  />
                </Grid>
                <Grid item>{custom_metric}</Grid>
              </Grid>
            </>
          </MuiDialogContent>
          <MuiDialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Save
            </Button>
          </MuiDialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Quantity;
