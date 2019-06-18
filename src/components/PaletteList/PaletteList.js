import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { withStyles } from "@material-ui/styles";
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';


import MiniPalette from "../MiniPalette/MiniPalette";
import styles from '../../styles/PaletteListStyles';

class PaletteList extends Component {
  goToPalette = id => {
    this.props.history.push(`/palette/${id}`);
  };
  render() {
    const { palettes, classes } = this.props;
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
                        removePalette={this.props.removePalette}
                        key={palette.id}
                        id={palette.id}
                        {...palette}
                        handleClick={() => this.goToPalette(palette.id)}
                    />
                  </CSSTransition>
              ))}
            </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
