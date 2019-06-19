import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {withStyles} from "@material-ui/styles";
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import {blue} from '@material-ui/core/colors';
import {red} from '@material-ui/core/colors';


import MiniPalette from "../MiniPalette/MiniPalette";
import styles from '../../styles/PaletteListStyles';

class PaletteList extends Component {

    state = {
        openDeleteDialog: false,
        deleteId: ''
    }

    handleOpenDeleteDialog = (id) => {
    this.setState({openDeleteDialog:true, deleteId: id})}

    handleCloseDeleteDialog = () => {
    this.setState({openDeleteDialog: false})}


    goToPalette = id => {
        this.props.history.push(`/palette/${id}`);
    };

    deletePalette = () => {
        this.props.removePalette(this.state.deleteId);
       this.handleCloseDeleteDialog()}


    render() {
        const {palettes, classes} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Colors</h1>
                        <Link to="/palette/new">Create palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette => (
                            <CSSTransition classNames='fade' timeout={500} key={palette.id}>
                                <MiniPalette
                                    //openDialog={this.handleOpenDeleteDialog}
                                    //removePalette={this.props.removePalette}
                                    removePalette={this.handleOpenDeleteDialog}
                                    key={palette.id}
                                    id={palette.id}
                                    {...palette}
                                    handleClick={() => this.goToPalette(palette.id)}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
                <Dialog open={this.state.openDeleteDialog} onClose={this.handleCloseDeleteDialog}>
                    <DialogTitle id='delete-dialog-title'>Delete the palette?</DialogTitle>
                    <List>
                        <ListItem button onClick={this.deletePalette}>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor:blue[100], color:blue[600]}}>
                                    <CheckIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Delete'/> </ListItem>
                        <ListItem button onClick={this.handleCloseDeleteDialog}>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor:red[100], color:red[600]}}>
                                    <CloseIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Cancel'/>
                    </ListItem>
                </List>
            </Dialog>
            < /div>
        );
    }
}

export default withStyles(styles)(PaletteList);
