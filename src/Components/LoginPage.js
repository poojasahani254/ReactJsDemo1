import React, {Component} from 'react';
import '../App.css';
import {withStyles} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import {
    withRouter,

} from "react-router-dom";
import {Login} from '../Action/Login'
import {connect} from "react-redux";

const swidth=window.innerWidth;
const sheight=window.innerHeight;

class login extends Component{
    constructor() {
        super();
        this.state={
            showPassword:false,
            checked:false,
            password:'',
            emailAddress:''
        }
    }

    componentDidMount() {
        const {emailAddress,checked}=this.state
        // const rememberMe = localStorage.getItem('rememberMe') === 'true';
        // const user = rememberMe ? localStorage.getItem('user') : '';
        // this.setState({ emailAddress:user, checked:rememberMe });
    }

    handleChange =()=>{
        this.setState({checked:!this.state.checked})
    }

    handlePassword =(text) =>{
        this.setState({password:text})
    }

    loginAction = async () => {
        let {history,UserData} = this.props;
        const {emailAddress, checked, password} = this.state;
        const data = {
            EmailAddress: emailAddress,
            Password: password
        }

       let a=await this.props.Login(data).then(res=>{
               if(res.status==200){
                   // alert(res.Data.EmailAddress)
                   // localStorage.setItem('rememberMe', checked);
                   // localStorage.setItem('user', checked ? emailAddress : '');
                   localStorage.setItem('userData', res.Data.EmailAddress);
                   history.push({
                       pathname: '/',
                   })
                   // history.push({
                   //     pathname: '/users',
                   //     state:{data: res.Data}
                   // })
               }else{
                   alert(res.Data)
               }
       }).catch(err=>{
           console.log(err)
       })
    }

    render(){

        const  {classes}=this.props;
        const {checked,showPassword,password,emailAddress}=this.state;

        const handleClickShowPassword = () => {
            this.setState({showPassword: !showPassword })

        };
        return (
            <div className={classes.maindiv}>

                <div className={classes.leftdiv}>
                    <div className={classes.contentDiv}>
                        <p className={classes.fcolor}>Gaia</p>
                    </div>
                </div>
                <div className={classes.rightdiv}>
                    <div className={classes.contentDiv}>
                           <center> <h2>Sign In</h2></center>
                        <div className={classes.cenetrItem}>
                            <FormGroup>
                                <Grid container className={classes.gridWrap} spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <AccountCircle />
                                    </Grid>
                                    <Grid item className={classes.itemWidth}>
                                        <TextField id="input-with-icon-grid" label="Email Address" className={classes.TextWidth}
                                                   onChange={(e)=>{
                                                            this.setState({emailAddress:e.target.value})}}
                                                   value={emailAddress}
                                        />
                                    </Grid>
                                </Grid>
                                <FormControl>
                                    <Grid container className={classes.gridWrap} spacing={1} alignItems="flex-end">
                                        <Grid item>
                                            <Lock />
                                        </Grid>
                                        <Grid item className={classes.itemWidth}>
                                            <InputLabel htmlFor="standard-adornment-password" className={classes.inputLabel}>Password</InputLabel>
                                            <Input
                                                className={classes.TextWidth}
                                                id="standard-adornment-password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                onChange={(e)=>{this.handlePassword(e.target.value)}}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                        >
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </Grid>
                                    </Grid>

                                </FormControl>
                                <FormControlLabel
                                    className={classes.Remember}
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={this.handleChange}
                                            value="disabled primary"
                                        />
                                    }label={'Remember Me'}
                                />

                                <div className={classes.btnDiv}>
                                    <Button variant="contained" className={classes.btnTop} color="primary" onClick={()=>{
                                        this.loginAction()
                                    }}>
                                        Submit
                                    </Button>
                                </div>

                            </FormGroup>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}

const  styles={
    gridWrap:{
        width:'100%'
    },
    itemWidth:{
        width:'85%',
    },
    inputLabel:{
        left:'unset'
    },
    TextWidth:{
        width:'80%'
    },
    btnTop:{
        marginTop:'20px',
        width: '50%',
    },btnDiv:{
      textAlign: 'center'
    },cenetrItem:{
      alignItems:'center',
        // backgroundColor:'red',
       // paddingLeft:0,
        padding:30
    },Remember:{
        marginTop: '10px',
        marginLeft: '-8px',
    },
    leftdiv:{
        float: 'left',
        backgroundColor: 'rgba(255,255,255,0.1)',
        height: sheight*0.8,
        width:'40%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius:swidth*0.01,
        borderBottomLeftRadius:swidth*0.01
    },rightdiv:{
        backgroundColor: '#fff',
        height: sheight*0.8,
        width: '40%',
        borderTopRightRadius:swidth*0.01,
        borderBottomRightRadius:swidth*0.01,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },maindiv:{
        height:sheight,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        display: 'flex',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage:`url('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT7_foNVZC7x9ru65eHtVwHB8Tcoxl4rp4-sboqlefqcPQa6XiR')`
    },contentDiv:{
        // backgroundColor:'red',
        height:sheight*0.7,
        width:'90%'
    },
    fcolor:{
        color:'#fff'
    },
    signintext:{
        textAlign:'center'
    }

}

const mapToStateProps = state => {
    const UserData = state.LoginReducer;
    return {
        UserData,
    };
};
export default withStyles(styles)(connect(mapToStateProps,{Login})(withRouter(login)));
