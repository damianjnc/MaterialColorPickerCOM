import React, {Component} from "react";

import Navbar from "./Navbar/Navbar";
import ColorBox from "./ColorBox/ColorBox";
import "./Palette.css";
import PaletteFooter from "./PaletteFooter/PaletteFooter";

class Palette extends Component {
    state = {level: 500, format: "hex"};

    changeLevel = level => {
        this.setState({level});
    };

    changeFormat = val => {
        this.setState({format: val});
    };

    render() {
        const {colors, emoji, paletteName, id} = this.props.palette;
        const {level, format} = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox
                showingFullPalette
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
                    showingAllColors
                />
                {/* Navbar goes here */}
                <div className="Palette-colors"> {colorBoxes} </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        );
    }
}

export default Palette;
