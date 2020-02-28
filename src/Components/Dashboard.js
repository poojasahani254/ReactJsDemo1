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
import {connect} from "react-redux";
import CreatableSelect from 'react-select/creatable';
import Modal from '@material-ui/core/Modal';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


import {userService} from "../Services/userServices";
import config from "./config";
import Header from '../CommonComponents/AppBar';

let arr=[]
class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open:true,
            left: false,
            CategoryData:[],
            selectedOption: null,
            inputValue: '',
            ismodal:false
        }
    }

    componentDidMount() {
        console.log(this.props.UserData)
        userService.getAllCategory().then((response)=>{
            this.setState({CategoryData:response})
            // this.state.CategoryData.map((item)=>{
            //     return item.Category_name
            // })
            for(let i=0; i<response.length; i++){
                let obj = { value: response[i].Category_name, label: response[i].Category_name};
                arr.push(obj)
            }
            console.log(arr)

        }).catch((err)=>{
            alert(err)
        })
    }

    handleClose =()=>{
      this.setState({open:false})
    }

    handleChange1 = (newValue) => {
        console.log('Value Changed');
        console.log(newValue);
    };

    render() {
        // const { data } = this.props.location.state
        const {open,CategoryData,ismodal}=this.state
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

                <Container className={classes.cardGrid} maxWidth="md" classes={{maxWidthMd:classes.maxWidthMd}}>
                    {/* End hero unit */}
                    <Grid container spacing={1} onClick={()=>{
                        // alert('hello')
                        this.setState({ismodal:true})
                    }}>
                        {CategoryData.map((item,index) => (
                            <Grid item key={index} xs={12} sm={4} md={3}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={`${config.apiUrl}/images/Image/category/${item.CategoryImage}`}
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.Category_name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <CreatableSelect
                    isClearable
                    onChange={this.handleChange1}
                    options={arr}
                    isMulti
                />

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={ismodal}
                    onClose={()=>{this.setState({ismodal:false})}}
                >
                    <div  className={classes.paper}>
                        <h2 id="simple-modal-title">Text in a modal</h2>
                        <p id="simple-modal-description">
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </p>

                    </div>
                </Modal>
            </div>
        )
    }
}

const styles = theme => ({
    cardGrid: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
        textAlign:'center',
        justifyContent:'center'
    }, maxWidthMd:{
        maxWidth:'100% !important',
    },paper: {
        position: 'absolute',
        // width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),

    },
});

const mapToStateProps = state => {
    const UserData = state.LoginReducer;
    return {
        UserData,
    };
};
export default withStyles(styles)(connect(mapToStateProps,null)(withRouter(Controls)));