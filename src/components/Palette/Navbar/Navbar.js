import React, {Component} from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import './Navbar.css';


class Navbar extends Component {
    state = {
        format:'hex'
    }
    handleChange = e => {
        this.setState({format:e.target.value});
        this.props.handleChange(e.target.value);
    }
    render() {
        const {level, changeLevel } = this.props;
        return (
            <header className='Navbar'>
                <div className='logo'>
                    <a href='/'>MaterialColorPickerCOM</a>
                </div>
                <div className='container'>
                    <span>Level: {level}</span>
                    <div className='slider'>
                        <Slider defaultValue={level} min={100} max={900} onAfterChange={changeLevel} step={100}/>
                    </div>
                </div>
                <div className='select-container'>
                    <Select value={this.state.format} onChange={this.handleChange}>
                        <MenuItem value='hex'>Hex #fffff</MenuItem>
                        <MenuItem value='rgb'>RGB rgb(255,255,255)</MenuItem>
                        <MenuItem value='rgba'>RGBA rgba(255,255,255, 1)</MenuItem>
                    </Select>
                </div>

            </header>
        );
    }
}

export default Navbar;