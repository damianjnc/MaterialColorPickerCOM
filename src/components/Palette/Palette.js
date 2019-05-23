import React, { Component } from "react";

import Navbar from "./Navbar/Navbar";
import ColorBox from "./ColorBox/ColorBox";
import "./Palette.css";

class Palette extends Component {
  state = { level: 500, format: "hex" };

  changeLevel = level => {
    this.setState({ level });
  };

  changeFormat = val => {
    this.setState({ format: val });
  };
  render() {
    const { colors, emoji, paletteName, id } = this.props.palette;
    const { level, format } = this.state;
    const colorBoxes = colors[level].map(color => (
      <ColorBox
        showLink={true}
        id={color.id}
        background={color[format]}
        name={color.name}
        key={color.id}
        moreUrl={`/palette/${id}/${color.id}`}
      />
    ));
    return (
      <div className="Palette">
        <Navbar
          handleChange={this.changeFormat}
          level={level}
          changeLevel={this.changeLevel}
        />
        {/* Navbar goes here */}
        <div className="Palette-colors"> {colorBoxes} </div>
        <footer className="Palette-footer">
          {paletteName}
          <span className="emoji">{emoji}</span>
        </footer>
      </div>
    );
  }
}

export default Palette;
