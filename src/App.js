import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import Palette from "./components/Palette/Palette";
import seedColors from "./components/seedColors";
import {generatePalette} from "./components/colorHelpers";
import PaletteList from "./components/PaletteList/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette/SingleColorPalette";
import NewPalette from "./components/NewPalette/NewPalette";
import Page from './Page';

class App extends Component {

    static defaultProps = {initStorege: JSON.parse(localStorage.getItem('palettes'))}


    state = {palettes: this.props.initStorege || seedColors};

    findPalette = id => {
        return this.state.palettes.find(function (element) {
            return element.id === id;
        });
    };

    savePalette = newPalette => {
        this.setState({palettes: [...this.state.palettes, newPalette]}, this.saveToLocalStorage);

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
            <Route render={({location}) => (
                <TransitionGroup>
                    <CSSTransition key={location.key} classNames='page' timeout={500}>
                        <Switch location={location}>
                            <Route
                                exact
                                path="/palette/new"
                                render={routeProps => (
                                    <Page>
                                        <NewPalette savePalette={this.savePalette}
                                                    palettes={this.state.palettes} {...routeProps} />
                                    </Page>
                                )}
                            />
                            <Route
                                exact
                                path="/palette/:paletteId/:colorId"
                                render={routeProps => (
                                    <Page>
                                        <SingleColorPalette
                                            colorId={routeProps.match.params.colorId}
                                            palette={generatePalette(
                                                this.findPalette(routeProps.match.params.paletteId)
                                            )}
                                        />
                                    </Page>
                                )}
                            />
                            <Route
                                exact
                                path="/"
                                render={routeProps => (
                                    <Page>
                                        <PaletteList
                                            palettes={this.state.palettes}
                                            removePalette={this.removePalette}
                                            {...routeProps}
                                        />
                                    </Page>
                                )}
                            />
                            <Route
                                exact
                                path="/palette/:id"
                                render={routeProps => (
                                    <Page>
                                        <Palette
                                            palette={generatePalette(
                                                this.findPalette(routeProps.match.params.id)
                                            )}
                                        />
                                    </Page>
                                )}
                            />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            )
            }>
            </Route>
        );
    }
}

export default App;
