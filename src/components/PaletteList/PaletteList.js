import React, {Component} from "react";
import MiniPalette from '../MiniPalette/MiniPalette';


class PaletteList extends Component {

    render() {
        const {palettes} = this.props;
        return (
            <div>
                <div><MiniPalette/></div>
                <h1>React Colors</h1>
                {palettes.map(palette => (
                    <MiniPalette {...palette}/>
                ))}
            </div>
        );
    }
}

export default PaletteList;
