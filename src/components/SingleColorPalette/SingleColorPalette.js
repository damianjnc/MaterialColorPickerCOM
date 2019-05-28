import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

import styles from "../../styles/SingleColorStyles";
import ColorBox from "../Palette/ColorBox/ColorBox";
import Navbar from "../Palette/Navbar/Navbar";
import PaletteFooter from "../Palette/PaletteFooter/PaletteFooter";

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.state = { format: "hex" };
  }

  gatherShades(palette, colorToFilterBy) {
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorToFilterBy)
      );
    }
    return shades.slice(1);
  }

  changeFormat = val => {
    this.setState({ format: val });
  };

  render() {
    const { format } = this.state;
    const { paletteName, emoji, id } = this.props.palette;
    const colorBoxes = this._shades.map(color => (
      <ColorBox
        name={color.name}
        key={color.name}
        background={color[format]}
        showingFullPalette={false}
      />
    ));

    return (
      <div className={this.props.classes.Palette}>
        <Navbar handleChange={this.changeFormat} showingAllColors={false} />
        <div className={this.props.classes.PaletteColors}>
          {colorBoxes}
          <div className={this.props.classes.goBack}>
            <Link to={`/palette/${id}`}>Go Back</Link>
          </div>
        </div>

        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
