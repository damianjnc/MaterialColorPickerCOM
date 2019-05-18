import React, { Component } from "react";
import Palette from "./components/Palette/Palette";
import seedColors from "./components/seedColors";
import { generatePalette } from "./components/colorHelpers";

class App extends Component {
  render() {
    return (
      <div>
        <Palette palette={generatePalette(seedColors[4])} />
      </div>
    );
  }
}

export default App;
