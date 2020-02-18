import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";

class Controls extends Component {
    constructor() {
        super();
        this.state = {
            onTextChange: true
        }
    }

    render() {
        const {classes} = this.props;
        return (
            // <Box component="span" m={3} color="text.primary" clone>
            //     <Button variant="contained" color="primary" onClick={()=>{
            //         this.setState({onTextChange:!this.state.onTextChange})
            //     }}>
            //         {this.state.onTextChange?'On':'Off'}
            //     </Button>
            // </Box>

            <form style={classes.form}>
                <span className={classes.formstyle}>
                    <input
                        type="text"
                        placeholder="Enter Company Name"
                        required
                    />
                <button variant="outlined">Submit</button>
                </span>

                <Button size="small" className={classes.margin}>
                    Small
                </Button>
            </form>
        )
    }
}

const styles = {
        frmtext: {
            position: 'relative',
            top: '-48',
            background: 'white',
            padding: '7',
            width: '57',
            color: 'red'
        }, formstyle: {
            border: 'thin solid red',
            padding: '2rem',
            margin: '2rem',
            display: 'flex',
        }
    }
;
export default withStyles(styles)(Controls);