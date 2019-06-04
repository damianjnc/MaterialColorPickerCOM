  import React, { Component } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Button } from "@material-ui/core";

class NewPaletteNav extends Component {
  state = {
    newPaletteName: ""
  };
  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { classes, open } = this.props;
    return (
      <div>
        <CssBaseline />
        <AppBar
          color="default"
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Persistent drawer
            </Typography>
            <ValidatorForm
              onSubmit={() =>
                this.props.handleSubmit(this.state.newPaletteName)
              }
            >
              <TextValidator
                label="Palette Name"
                value={this.state.newPaletteName}
                name="newPaletteName"
                onChange={this.handleChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={[
                  "Palette name required",
                  "Palette name must be unique"
                ]}
              />
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button color="secondary" variant="contained">
                  Go Back
                </Button>
              </Link>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default NewPaletteNav;
