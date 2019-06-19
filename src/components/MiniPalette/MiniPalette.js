import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from '@material-ui/icons/Delete';


import styles from "../../styles/MiniPaletteStyles";

class MiniPalette extends Component {

  removePalette = event => {
    event.stopPropagation();
   this.props.removePalette(this.props.id);
  }

  render(){
    const { classes, colors } = this.props;
    const miniColorBoxes = colors.map(color => (
      <div
        key={color.name}
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
      />
    ));
    return (
      <div className={classes.root} onClick={this.props.handleClick}>
          <DeleteIcon 
            className={classes.deleteIconButton} 
            style={{transition: 'all 0.3s ease-in-out', borderRadius: '10%'}} 
            onClick={this.removePalette} />
        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {this.props.paletteName}
          <span className={classes.emoji}>{this.props.emoji}</span>
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
