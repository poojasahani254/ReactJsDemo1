import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import  FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Header from '../CommonComponents/AppBar';

class Controls extends Component {
    constructor() {
        super();
        this.state = {
            onTextChange: true,
            checked:false
        }
        console.log('controls')
    }

    handleChange =()=>{
        this.setState({checked:!this.state.checked})
    }
    render() {
        const {classes} = this.props;
        const {checked}=this.state;
        return (
            // <Box component="span" m={3} color="text.primary" clone>
            //     <Button variant="contained" color="primary" onClick={()=>{
            //         this.setState({onTextChange:!this.state.onTextChange})
            //     }}>
            //         {this.state.onTextChange?'On':'Off'}
            //     </Button>
            // </Box>
            <div>
                <Header />
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

                    <Button variant="outlined" size="medium" color={"primary"}>Default</Button>
                    <div className={classes.root}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                                Upload
                            </Button>
                        </label>
                        <IconButton aria-label="delete" className={classes.margin} size="small" onClick={()=>alert('hello')}>
                            <DeleteIcon />
                        </IconButton>
                        <Button
                            variant="contained"
                            color="secondary"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                        >
                            Delete
                        </Button>
                        <ButtonGroup color="primary" variant="outlined" aria-label="contained primary button group" fullWidth={true}>
                            <Button>One</Button>
                            <Button>Two</Button>
                            <Button>Three</Button>
                        </ButtonGroup>
                    </div>

                </form>

                <FormGroup>
                    <FormControlLabel
                    control={
                        <Checkbox
                            checked={checked}
                            onChange={this.handleChange}
                            value="disabled primary"
                            inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                        />
                    }label={'Dance'}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={this.handleChange}
                                value="disabled primary"
                                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                            />
                        }label={'Travel'}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={this.handleChange}
                                icon={<FavoriteBorder />}
                                checkedIcon={<FavoriteIcon />}
                            />
                        }
                        label={'Favorite'}
                    />
                </FormGroup>
            </div>


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
        },input: {
        display: 'none',
    },
    }
;
export default withStyles(styles)(Controls);