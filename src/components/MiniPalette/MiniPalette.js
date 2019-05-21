import React from 'react';
import {withStyles} from '@material-ui/styles';

const styles = {
    root:{
        backgroundColor: 'white',
        borderRadius: '5px',
        border:'1px solid black',
        padding: '0.5rem',
        position:'relative',
        overflow:'hidder',
        "&:hover":{
            cursor:'pointer'
        }
    },
    emoji:{
        marginLeft:'0.5rem',
        fontSize: '1.5rem'
    },
    colors:{
        backgroundColor: 'grey'
    },
    title:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems:'center',
        margin:'0',
        color:'black',
        paddingTop: '0.5rem',
        fontSize:'1rem',
        position:'relative'
    }

}

function MiniPalette(props) {
    const {classes} = props;
    return(
        <div className={classes.root}>
            <div className={classes.colors}/>
            <h5 className={classes.title}>{props.paletteName}
            <span className={classes.emoji}>{props.emoji}</span></h5>
        </div>
    );
}

export default withStyles(styles)(MiniPalette);