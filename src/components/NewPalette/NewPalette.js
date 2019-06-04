import React, {Component} from "react";
import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {Button} from "@material-ui/core";
import {arrayMove} from "react-sortable-hoc";

import DraggableColorList from "./DraggableColor/DraggableColorList/DraggableColorList";
import NewPaletteNav from "./NewPaletteNav/NewPaletteNav";
import ColorPicker from "./ColorPicker/ColorPicker";

const drawerWidth = 390;

const styles = theme => ({
    root: {
        display: "flex"
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
    },
    sideDrawer:{
        width: '90%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons:{

    }
});

class NewPalette extends Component {
    static defaultProps = {
        maxColors: 20
    };

    state = {
        open: true,
        colors: this.props.palettes[0].colors
    };

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    createNewColor = (newColor) => {
        this.setState({
            colors: [...this.state.colors, newColor],
            newColorName: ""
        });
    };

    handleSubmit = newPaletteName => {
        const newPalette = {
            paletteName: newPaletteName,
            id: newPaletteName.toLowerCase().replace(/ /g, "-"),
            colors: this.state.colors
        };
        this.props.savePalette(newPalette);
        this.props.history.push("/");
    };

    removeColor = colorName => {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== colorName)
        });
    };

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({colors}) => ({
            colors: arrayMove(colors, oldIndex, newIndex)
        }));
    };

    clearColors = () => {
        this.setState({colors: []});
    };

    addRandomColor = () => {
        const allColors = this.props.palettes.map(colors => colors.colors).flat();
        const rand = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[rand];
        console.log(randomColor);
        this.setState({colors: [...this.state.colors, randomColor]});
    };

    render() {
        const {classes, palettes} = this.props;
        const {open} = this.state;
        const fullPalette = this.state.colors.length >= this.props.maxColors;

        return (
            <div className={classes.root}>
                <NewPaletteNav
                    handleDrawerOpen={this.handleDrawerOpen}
                    open={open}
                    newPaletteName
                    palettes={palettes}
                    handleSubmit={this.handleSubmit}
                />
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
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <div className={classes.sideDrawer}>
                        <Typography variant="h4">Design your Palette</Typography>
                        <div className={classes.buttons}>
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={this.clearColors}
                            >
                                Clear Palette
                            </Button>
                            <Button
                                disabled={fullPalette}
                                color="primary"
                                variant="contained"
                                onClick={this.addRandomColor}
                            >
                                Random Color
                            </Button>
                        </div>
                        <ColorPicker colors={this.state.colors} fullPalette={fullPalette}
                                     createNewColor={this.createNewColor}/>
                    </div>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open
                    })}
                >
                    <div className={classes.drawerHeader}/>
                    <DraggableColorList
                        colors={this.state.colors}
                        removeColor={this.removeColor}
                        axis="xy"
                        onSortEnd={this.onSortEnd}
                    />
                </main>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(NewPalette);
