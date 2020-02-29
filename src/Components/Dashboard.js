import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    TextField,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    Container,
    IconButton,
    FormControl,
    Snackbar,
    Backdrop,
    CircularProgress
} from '@material-ui/core';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {connect} from "react-redux";
import CreatableSelect from 'react-select/creatable';
import CloseIcon from '@material-ui/icons/Close';

import {userService} from "../Services/userServices";
import config from "./config";
import Header from '../CommonComponents/AppBar';
import {AddCategory} from '../Action/Login';

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
            ismodal:false,
            filename:'Upload File',
            CategoryName:'',
            isEditdisabled:false,
            isInsertdisabled:false,
            isSnack:false,
            backdrop:true
        }
    }

    componentDidMount() {

        let visited=localStorage.getItem('alreadyVisited');
        if(visited && visited!=null){
            this.setState({open:false})
        }else{
            localStorage.setItem("alreadyVisited",true)
            this.setState({open:true})
        }

        console.log(this.props.UserData)
       this.GetData()
    }

    GetData = ()=>{
        userService.getAllCategory().then((response)=>{
            this.setState({CategoryData:response,backdrop:false})

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
      this.setState({
          open:false,
          ismodal:false,
          isInsertdisabled:false,
          isdisabled:false,
          CategoryName:'',
          filename:'Upload File',
          filePath:''
      })
    }

    handleChange1 = (newValue) => {
        console.log('Value Changed');
        console.log(newValue);
    };

    ReadFile = (event)=>{
        console.log(event.target.files[0].name)
        this.setState({filename:event.target.files[0].name,filePath:event.target.files[0]})
    }

    handleChange2 = (event) =>{
        let {value}=event.target;
        // console.log(event.target.id+"   "+event.target.value)
        this.setState({[event.target.id]: value});
    }

    EditOpreation = () =>{
        let {filename,CategoryName}=this.state
        alert(CategoryName+"   "+filename)
    }

    InsertOpreation = () =>{
        let {filePath,CategoryName}=this.state
        const data = new FormData();
        data.append('fileData', filePath);
        data.append('name',CategoryName);
       console.log(filePath)
        // const data={
        //     filedata:filePath,
        //     Category_name:CategoryName
        // }
        this.props.AddCategory(data).then(response=>{
            this.GetData();
        });
        this.setState({isSnack:true,ismodal:false})

    }

    handleSnackClose =() =>{
        this.setState({isSnack:false})
    }

    render() {
        console.log("sds",this.state.CategoryData)
        // const { data } = this.props.location.state
        const {open,CategoryData,ismodal,filename,CategoryName,isdisabled,isInsertdisabled,isSnack,backdrop}=this.state
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

                <Backdrop className={classes.backdrop} open={backdrop} >
                    <CircularProgress color="inherit" />
                </Backdrop>

                <Container className={classes.cardGrid} maxWidth="md" classes={{maxWidthMd:classes.maxWidthMd}}>
                    <Grid container spacing={1}>
                        {CategoryData.map((item,index) => (
                            <Grid item key={index} xs={12} sm={4} md={3} onClick={()=>{
                                this.setState({ismodal:true,CategoryName:item.Category_name,filename:item.CategoryImage,isInsertdisabled:true})
                            }}>
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
                        <Grid item key={'Add'} xs={12} sm={4} md={3} onClick={()=>{
                            this.setState({ismodal:true,isdisabled:true})}}>
                            <Card className={[classes.card,{justifyContent: 'center'}]}>
                                <CardContent className={classes.cardContent}>
                                    <AddCircleIcon color={'primary'}/>
                                    <Typography gutterBottom variant="h5" component="h2" color={'primary'}>
                                      ADD MORE
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <CreatableSelect
                        isClearable
                        onChange={this.handleChange1}
                        options={arr}
                        isMulti
                    />
                </Container>

                <Dialog
                    open={ismodal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <div className={classes.dialogWidth}>
                        <DialogTitle id="alert-dialog-title" className={classes.headerText}>
                            <Typography>Action</Typography>
                            {ismodal ? (
                                <IconButton aria-label="close" className={classes.closeButton} onClick={this.handleClose}>
                                    <CloseIcon color="action" />
                                </IconButton>
                            ) : null}</DialogTitle>
                        <DialogContent>
                            <div className={classes.dialogInnerDiv}>
                                <FormControl style={{paddingBottom: 12}}>
                                    <TextField id="CategoryName"
                                               label="Category Name"
                                               variant="outlined"
                                               value={CategoryName}
                                               onChange={(event)=>{
                                                this.handleChange2(event)
                                               }}
                                    />
                                </FormControl>
                                <FormControl style={{paddingBottom: 12}}>
                                    <Button
                                        variant="outlined"
                                        component="label">
                                        {filename}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={(event)=> { this.ReadFile(event) }}/>
                                    </Button>
                                </FormControl>
                            </div>
                        </DialogContent>
                        <DialogActions className={classes.btnContainer}>
                            <Button onClick={this.InsertOpreation} color="primary" variant='contained' disabled={isInsertdisabled}>
                                Insert
                            </Button>
                            <Button onClick={this.EditOpreation} color="primary" variant='contained' disabled={isdisabled}>
                                Edit
                            </Button>
                        </DialogActions>
                    </div>
                </Dialog>

                <Snackbar
                    open={isSnack}
                    onClose={this.handleSnackClose}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    autoHideDuration={10000}
                    message="Data Added Successfully!"
                />
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
        // position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },headerText: {
        textAlign: 'center',
        backgroundImage: 'linear-gradient(45deg, rgb(45,89,177) 30%, rgba(45,89,177,0.5) 90%)',
        color: '#fff'
    },dialogWidth: {
        width: '370px',
        '@media (max-width: 480px)': {
            width: 'auto'
        }
    },dialogInnerDiv: {
        display: 'flex',
        flexDirection: 'column',
        padding: 12,
    }, btnContainer: {
        justifyContent: 'flex-end!important',
        // marginBottom: '10px'
    },closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});

const mapToStateProps = state => {
    const UserData = state.LoginReducer;
    return {
        UserData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        AddCategory: node => dispatch(AddCategory(node)),
    };
};
export default withStyles(styles)(connect(mapToStateProps,mapDispatchToProps)(withRouter(Controls)));