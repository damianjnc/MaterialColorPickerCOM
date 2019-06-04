import React, {Component} from "react";
import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {ChromePicker} from "react-color";
import {Button} from "@material-ui/core";
import {arrayMove} from "react-sortable-hoc";

const styles ={
    picker:{
        marginTop: '2rem'
    },
    colorButton:{
        width: '100%',
        padding: '1rem',
        marginTop: '1rem',
        fontSize: '2rem'
    }
}

class ColorPicker extends Component {
    state = {
        currentColor: "teal",
        newColorName: ""
    };


    componentDidMount() {
        ValidatorForm.addValidationRule("isNameUnique", value =>
            this.props.colors.every(
                ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule("isColorUnique", value =>
            this.props.colors.every(({color}) => color !== this.state.currentColor)
        );
    }


    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    updateCurrentColor = newColor => {
        this.setState({currentColor: newColor.hex});
    };

    handleSubmit = () => {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        };
        this.props.createNewColor(newColor);
        this.setState({  newColorName: ""})
    }

    render() {
        const {fullPalette, classes} = this.props;
        return (
            <div>
                <ChromePicker
                    className={classes.picker}
                    width='100%'
                    color={this.state.currentColor}
                    onChangeComplete={this.updateCurrentColor}
                />
                <ValidatorForm onSubmit={this.handleSubmit} ref="form">
                    <TextValidator
                        value={this.state.newColorName}
                        name="newColorName"
                        onChange={this.handleChange}
                        validators={["required", "isNameUnique", "isColorUnique"]}
                        errorMessages={[
                            "this field is required",
                            "Color name is not unique",
                            "Color already on the palette"
                        ]}
                    />
                    <Button
                        className={classes.colorButton}
                        color="primary"
                        type="submit"
                        style={{
                            backgroundColor: fullPalette ? "grey" : this.state.currentColor
                        }}
                        variant="contained"
                        disabled={fullPalette}
                    >
                        {fullPalette ? "Palette is Full" : "Add Color"}
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}

export default withStyles(styles)(ColorPicker);
