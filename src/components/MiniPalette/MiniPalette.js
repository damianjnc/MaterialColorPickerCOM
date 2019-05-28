import React from "react";
import { withStyles } from "@material-ui/styles";

import styles from "../../styles/MiniPaletteStyles";

function MiniPalette(props) {
  const { classes, colors } = props;
  const miniColorBoxes = colors.map(color => (
    <div
      key={color.name}
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
    />
  ));
  return (
    <div className={classes.root} onClick={props.handleClick}>
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {props.paletteName}
        <span className={classes.emoji}>{props.emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
