import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Palette from "./components/Palette/Palette";
import seedColors from "./components/seedColors";
import { generatePalette } from "./components/colorHelpers";
import PaletteList from "./components/PaletteList/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette/SingleColorPalette";
import NewPalette from "./components/NewPalette/NewPalette";

class App extends Component {

  static defaultProps = { initStorege: JSON.parse(localStorage.getItem('palettes'))}


  state = { palettes: this.props.initStorege || seedColors };

  findPalette = id => {
    return this.state.palettes.find(function(element) {
      return element.id === id;
    });
  };

  savePalette = newPalette => {
    this.setState({ palettes: [...this.state.palettes, newPalette] }, this.saveToLocalStorage);

  };

  removePalette = (id) => {
    this.setState(prevState => ({
      palettes: prevState.palettes.filter(palette =>
        palette.id !== id
      )
    }), this.saveToLocalStorage);

  }

  saveToLocalStorage = () => {
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes));
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={routeProps => (
            <NewPalette savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />
          )}
        />
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
            <PaletteList 
                palettes={this.state.palettes} 
                removePalette={this.removePalette} 
                {...routeProps} 
            />
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

    );
  }
}

export default App;
