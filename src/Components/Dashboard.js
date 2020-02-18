import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import VerifiedUser from '@material-ui/icons/VerifiedUser';

class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open:true
        }
    }

    handleClose =()=>{
    this.setState({open:false})
    }

    render() {
        const { data } = this.props.location.state
        const {open}=this.state
        return (
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title"><VerifiedUser fontSize='large' /></DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Welcome {data.username}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>this.handleClose()} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>


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
        },
    }
;
export default withStyles(styles)(withRouter(Controls));