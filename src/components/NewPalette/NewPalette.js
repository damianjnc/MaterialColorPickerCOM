import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ChromePicker } from "react-color";
import { Button } from "@material-ui/core";
import {arrayMove} from 'react-sortable-hoc';
import DraggableColorList from "./DraggableColor/DraggableColorList/DraggableColorList";

const drawerWidth = 390;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

class NewPalette extends Component {

  static defaultProps = {
    maxColors: 20
  };

  state = {
    open: true,
    currentColor: "teal",
    colors: this.props.palettes[0].colors,
    newColorName: "",
    newPaletteName: ""
  };

  componentDidMount() {
    ValidatorForm.addValidationRule("isNameUnique", value =>
      this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", value =>
      this.state.colors.every(({ color }) => color !== this.state.currentColor)
    );

    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  updateCurrentColor = newColor => {
    this.setState({ currentColor: newColor.hex });
  };

  createNewColor = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    this.setState({
      colors: [...this.state.colors, newColor],
      newColorName: ""
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    let newName = this.state.newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors
    };
    this.props.savePalette(newPalette);
    this.props.history.push("/");
  };

  removeColor = colorName => {
    this.setState({colors:this.state.colors.filter(color => color.name !== colorName)})
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  clearColors = () => {
    this.setState({colors:[]})
  }

  addRandomColor = () => {
    const allColors = this.props.palettes.map(colors => colors.colors).flat();
    const rand = Math.floor(Math.random()*allColors.length);
    const randomColor = allColors[rand];
    console.log(randomColor);
    this.setState({colors: [...this.state.colors, randomColor]})
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const fullPalette = this.state.colors.length >= this.props.maxColors;

    return (
      <div className={classes.root}>
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
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Persistent drawer
            </Typography>
            <ValidatorForm onSubmit={this.handleSubmit}>
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
            </ValidatorForm>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Typography variant="h4">Design your Palette</Typography>
          <div>
            <Button color="secondary" variant="contained" onClick={this.clearColors}>
              Clear Palette
            </Button>
            <Button disabled={fullPalette} color="primary" variant="contained" onClick={this.addRandomColor}>
              Random Color
            </Button>
          </div>
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
              style={{ backgroundColor: fullPalette ? 'grey' : this.state.currentColor }}
              variant="contained"
              disabled={fullPalette}
            >
              {fullPalette ? 'Palette is Full' : 'Add Color'}
            </Button>
          </ValidatorForm>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
          colors={this.state.colors}
          removeColor={this.removeColor}
          axis='xy'
          onSortEnd={this.onSortEnd}
          />

        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPalette);
