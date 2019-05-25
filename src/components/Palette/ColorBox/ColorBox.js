import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";
import chroma from 'chroma-js';
import {Link} from "react-router-dom";
import {CopyToClipboard} from "react-copy-to-clipboard";
import "./ColorBox.css";

const styles = {
    colorBox: {
        width: '20%',
        height: props => props.showingFullPalette ? '25%' : '50%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-5px',
        '&:hover button': {
            opacity:1
        }
    },
    copyText: {
        color: props => chroma(props.background).luminance() >= 0.65 ? 'black' : 'white'
    },
    colorName: {
        color: props => chroma(props.background).luminance() >= 0.6 ? 'black' : 'white'
    },
    seeMore: {
        color: props => chroma(props.background).luminance() >= 0.6 ? 'rgba(0,0,0,0.6)' : 'white',
        background: 'rgba(255, 255, 255, 0.3)',
        position: 'absolute',
        bottom: '0px',
        right: '0px',
        border: 'none',
        width: '60px',
        height: '30px',
        textAlign: 'center',
        lineHeight: '30px',
        textTransform: 'uppercase'
    },
    copyButton: {
        color: props => chroma(props.background).luminance() >= 0.6 ? 'rgba(0,0,0,0.6)' : 'white',
        width: '100px',
        height: '30px',
        position: 'absolute',
        display: 'inline-block',
        top: '50%',
        left: '50%',
        marginLeft: '-50px',
        marginTop: '-15px',
        textAlign: 'center',
        outline: 'none',
        background: 'rgba(255, 255, 255, 0.3)',
        fontSize: '1rem',
        lineHeight: '30px',
        textTransform: 'uppercase',
        border: 'none',
        textDecoration: 'none',
        opacity: 0
    }
};

class Palette extends Component {
    state = {copied: false};
    changeCopyState = () => {
        this.setState({copied: true}, () => {
            setTimeout(() => {
                this.setState({copied: false});
            }, 1500);
        });
    };

    render() {
        const {name, background, moreUrl, showingFullPalette, classes} = this.props;
        const {copied} = this.state;

        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{background}} className={classes.colorBox}>
                    <div
                        style={{background}}
                        className={`copy-overlay ${copied && "show"}`}
                    />
                    <div className={`copy-msg ${copied && "show"}`}>
                        <h1>copied!</h1>
                        <p className={classes.copyText}>{this.props.background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {showingFullPalette && (
                        <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                            <span className={classes.seeMore}>MORE</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(Palette);
