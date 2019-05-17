import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import ColorBox from "./ColorBox/ColorBox";
import "./Palette.css";

class Palette extends Component {
  render() {
    const colorBoxes = this.props.palette.colors[500].map(color => (
      <ColorBox background={color.hex} name={color.name} />
    ));
    return (
      <div className="Palette">
        <Slider />
        {/* Navbar goes here */}
        <div className="Palette-colors"> {colorBoxes} </div>
        {/*footer here */}
      </div>
    );
  }
}

export default Palette;
