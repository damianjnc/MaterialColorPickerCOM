import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ChromePicker } from "react-color";
import { Button } from "@material-ui/core";
import { arrayMove } from "react-sortable-hoc";

class ColorPicker extends Component {
  state = {
    currentColor: "teal",
    newColorName: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateCurrentColor = newColor => {
    this.setState({ currentColor: newColor.hex });
  };

  render() {
    const { fullPalette } = this.props;
    return (
      <div>
        <ChromePicker
          color={this.state.currentColor}
          onChangeComplete={this.updateCurrentColor}
        />
        <ValidatorForm onSubmit={this.createNewColor} ref="form">
          <TextValidator
            value={this.state.newColorName}
            name="newColorName"
            onChange={this.handleChange}
            validators={["required", "isNameUnique", "isColorUnique"]}
            errorMessages={[
              "this field is required",
              "Color name is not unique",
              "Color already on the palette"
            ]}
          />
          <Button
            color="primary"
            type="submit"
            style={{
              backgroundColor: fullPalette ? "grey" : this.state.currentColor
            }}
            variant="contained"
            disabled={fullPalette}
          >
            {fullPalette ? "Palette is Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default ColorPicker;
