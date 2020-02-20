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
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {userService} from "../Services/userServices";
import config from "./config";
import Header from '../CommonComponents/AppBar';

class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open:true,
            anchorEl:null,
            left: false,
            CategoryData:[]
        }
    }

    componentDidMount() {
        userService.getAllCategory().then((response)=>{
            this.setState({CategoryData:response})
        }).catch((err)=>{
            alert(err)
        })
    }

    handleClose =()=>{
      this.setState({open:false})
    }

    handleMenuClose =()=>{
        this.setState({anchorEl:null})
    }

    handleProfileMenuOpen = event => {
        this.setState({anchorEl:event.currentTarget})
    };

    toggleDrawer =(side,open)=>{
        this.setState({[side]:open})
    }

    logout =() =>{
        let {history}=this.props;
        localStorage.clear()
            history.push({
                pathname: '/'
            })
    }

    sideList=side=>{
        const {classes}=this.props;
        return(
            <div
                className={classes.list}
                role="presentation"
                    // this.toggleDrawer( side,false)}
            >
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text} component={Link} to={'/about'}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );

}

    render() {
        // const { data } = this.props.location.state
        const {open,anchorEl,CategoryData}=this.state
        const {classes} = this.props;
        const menuId = 'primary-search-account-menu';
        const isMenuOpen = Boolean(anchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={this.logout}>Logout</MenuItem>
            </Menu>
        );


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
                <Drawer  open={this.state.left} onClose={()=>this.toggleDrawer( 'left',false)}>
                    {this.sideList('left')}
                </Drawer>
                <Header OnDrawer={() => this.toggleDrawer('left',true)} />

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

export default withStyles(styles)(withRouter(Controls));