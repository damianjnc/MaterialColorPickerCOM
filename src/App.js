import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import Palette from "./components/Palette/Palette";
import seedColors from "./components/seedColors";
import {generatePalette} from "./components/colorHelpers";
import PaletteList from "./components/PaletteList/PaletteList";

class App extends Component {
    findPalette = id => {
        return seedColors.find(function (element) {
            return element.id === id;
        });
    };

    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => <PaletteList palettes={seedColors}/>}/>
                <Route
                    exact
                    path="/palette/:id"
                    render={(routeProps) => <Palette
                        palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>}
                />
            </Switch>
            /* <div>
              <Palette palette={generatePalette(seedColors[4])} />
            </div> */
        );
    }
}

export default App;
