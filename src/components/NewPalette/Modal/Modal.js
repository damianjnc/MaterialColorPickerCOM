import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import {Picker} from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'

class Modal extends Component {
    state = {phase: 'form', newPaletteName: ""};

    componentDidMount() {
        ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
            this.props.palettes.every(
                ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    showPicker = () => {
        this.setState({phase: 'picker'})
    }
    savePalette = pickerObject => {
        this.props.handleSubmit({
            paletteName: this.state.newPaletteName,
            emoji: pickerObject.native
        });
            this.setState({phase: ''})
    }

    render() {
        const {handleClose} = this.props;
        return (
            <div>
                <Dialog onClose={handleClose} open={this.state.phase === 'picker'}>
                    <DialogTitle id="form-dialog-title">Pick your emoji</DialogTitle>

                    <Picker
                    title='Pick your emoji…'
                    onSelect={this.savePalette}/></Dialog>
                <Dialog
                    open={this.state.phase === 'form'}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Create a Palette Name</DialogTitle>
                    <ValidatorForm
                        onSubmit={this.showPicker}
                    >
                        <DialogContent>
                            <DialogContentText>
                                Please enter a unique name of your pallete.
                            </DialogContentText>

                            <TextValidator
                                label="Palette Name"
                                value={this.state.newPaletteName}
                                name="newPaletteName"
                                fullWidth
                                onChange={this.handleChange}
                                validators={["required", "isPaletteNameUnique"]}
                                errorMessages={[
                                    "Palette name required",
                                    "Palette name must be unique"
                                ]}
                            />


                        </DialogContent>

                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" type="submit">
                                Save Palette
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>

        );
    }
}

export default Modal;
