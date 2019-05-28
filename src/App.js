import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Palette from "./components/Palette/Palette";
import seedColors from "./components/seedColors";
import { generatePalette } from "./components/colorHelpers";
import PaletteList from "./components/PaletteList/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette/SingleColorPalette";
import NewPalette from './components/NewPalette/NewPalette';

class App extends Component {
  findPalette = id => {
    return seedColors.find(function(element) {
      return element.id === id;
    });
  };

  render() {
    return (
      <Switch>
        <Route exact path="/palette/new" render={() => <NewPalette/>} />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={routeProps => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={routeProps => (
            <PaletteList palettes={seedColors} {...routeProps} />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
      </Switch>
      /* <div>
              <Palette palette={generatePalette(seedColors[4])} />
            </div> */
    );
  }
}

export default App;
