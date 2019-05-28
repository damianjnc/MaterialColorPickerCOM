import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import "rc-slider/assets/index.css";
import styles from '../../../styles/NavbarStyles';


class Navbar extends Component {
  state = {
    format: "hex",
    open: false
  };
  handleFormatChange = e => {
    this.setState({ format: e.target.value, open: true });
    this.props.handleChange(e.target.value);
  };
  closeSnackbar = () => {
    this.setState({ open: false });
  };

  render() {
    const { level, changeLevel, classes } = this.props;
    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <a href="/">MaterialColorPickerCOM</a>
        </div>
        {this.props.showingAllColors && (
          <div>
            <span>Level: {level}</span>
            <div className={classes.slider}>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                onAfterChange={changeLevel}
                step={100}
              />
            </div> 
          </div>
        )}

        <div className={classes.selectContainer}>
          <Select value={this.state.format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">Hex #fffff</MenuItem>
            <MenuItem value="rgb">RGB rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA rgba(255,255,255, 1)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={3000}
          message={
            <span id="message-id">Format Changed to {this.state.format}!</span>
          }
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton
              onClick={this.closeSnackbar}
              aria-label="close"
              color="inherit"
              key="close"
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </header>
    );
  }
}

export default withStyles(styles)(Navbar);
