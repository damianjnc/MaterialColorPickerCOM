import React, {Component} from "react";

import Navbar from './Navbar/Navbar';
import ColorBox from "./ColorBox/ColorBox";
import "./Palette.css";

class Palette extends Component {
    state = {level: 500,
    format:'hex'}

    changeLevel = (level) => {
        this.setState({level});
    }

    changeFormat = val => {
        this.setState({format: val})
    }
    render() {
        const {colors} = this.props.palette;
        const {level, format} = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox background={color[format]} name={color.name}/>
        ));
        return (
            <div className="Palette">

                <Navbar handleChange={this.changeFormat} level={level} changeLevel={this.changeLevel} />
                {/* Navbar goes here */}
                <div className="Palette-colors"> {colorBoxes} </div>
                {/*footer here */}
            </div>
        );
    }
}

export default Palette;
