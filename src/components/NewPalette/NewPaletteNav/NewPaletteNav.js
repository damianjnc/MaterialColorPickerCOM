import React, {Component} from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {Button} from "@material-ui/core";

import Modal from '../Modal/Modal';

import styles from "../../../styles/NewPaletteNavStyles";

class NewPaletteNav extends Component {
    state = {
        newPaletteName: "",
        showForm: false
    };

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleClickOpen = () => {
        this.setState({showForm: true});
    };

    handleClose = () => {
        this.setState({showForm: false});
    };

    render() {
        const {classes, open} = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline/>
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
                            className={classNames(classes.menuButton, {[classes.hide]:open} )}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Create a Palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navButtons}>

                        <Link to="/" style={{textDecoration: "none"}}>
                            <Button
                                className={classes.button}
                                color="secondary"
                                variant="contained">
                                Go Back
                            </Button>
                        </Link>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={this.handleClickOpen}
                        >
                            Save
                        </Button>
                    </div>
                </AppBar>
                {this.state.showForm ? (
                    <Modal show={this.state.showForm} handleClose={this.handleClose} palettes={this.props.palettes}
                           handleSubmit={this.props.handleSubmit}/>) : null}
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(NewPaletteNav);
