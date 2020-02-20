import React, {Component} from 'react';
import {withStyles,makeStyles,fade} from "@material-ui/core";
import {Link, withRouter} from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";

import {userService} from "../Services/userServices";
import config from "./config";
import Header from '../CommonComponents/AppBar';

class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open:true,
            left: false,
            CategoryData:[]
        }
    }

    componentDidMount() {
        console.log(this.props.UserData)
        userService.getAllCategory().then((response)=>{
            this.setState({CategoryData:response})
        }).catch((err)=>{
            alert(err)
        })
    }

    handleClose =()=>{
      this.setState({open:false})
    }

    render() {
        // const { data } = this.props.location.state
        const {open,CategoryData}=this.state
        const {classes} = this.props;

        return (
            <div className={classes.grow1}>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title"><VerifiedUser fontSize='large' /></DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Welcome {localStorage.getItem('userData')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>this.handleClose()} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>

                <Header  />

                <div className={classes.root}>
                    {
                        CategoryData.map((item,index)=>{
                            return(
                                <Paper elevation={3}>
                                    <img src={`${config.apiUrl}/images/Image/category/${item.CategoryImage}`} alt="product" className={classes.imagstyle}/>
                                     <p>{item.Category_name}</p>
                                </Paper>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const styles = theme => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(25),
            height: theme.spacing(25),
        },
    },imagstyle:{
        height:'70%',
        width:'100%'
    }
});

const mapToStateProps = state => {
    const UserData = state.LoginReducer;
    return {
        UserData,
    };
};
export default withStyles(styles)(connect(mapToStateProps,null)(withRouter(Controls)));