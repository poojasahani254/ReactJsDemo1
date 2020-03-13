import React,{useState,useEffect,useRef} from 'react';
import {connect} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from '../CommonComponents/AppBar'
import {getAllLazyCategory} from "../Action/Login";

function SortableComponent(props) {

    const classes = useStyles();
    const [Catedata,setCatdata]=useState([]);
    const [isLoad,setLoad]=useState(false)
    const [page,setpage]=useState(1)

     useEffect(()=>{
         const data={
             page:page
         }
         props.getAllLazyCategory(data).then((response)=>{
             setCatdata(response.data)
             setLoad(true)
         }).catch((err)=>{
             console.log(err)
         })
     },[])

   function handleScroll (e) {
       const target=e.target
       if(target.scrollHeight-target.scrollTop===target.clientHeight){
        console.log('At bottom of the scroll')
           const data={
               page:page+1
           }
           setpage(page+1)
           props.getAllLazyCategory(data).then((response)=>{
               setCatdata(prevState => ([...prevState.concat(response.data)]));
               // console.log(Catedata)
               setLoad(true)
           }).catch((err)=>{
               console.log(err)
           })
       }
    };

    return(
        <div className={classes.root}>
            <div className={classes.headerDiv}>
                <Header/>
            </div>
            <div className={classes.ChildDiv} onScroll={handleScroll}>
                <div className={classes.containData}>
                {
                        Catedata.map((item,index)=>(
                            <Card className={classes.root1}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.Category_name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Description
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Share
                                    </Button>
                                    <Button size="small" color="primary">
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                            ))
                }
                </div>
            </div>
            <div className={classes.loader}>
                {
                    !isLoad && <CircularProgress />
                }

            </div>
        </div>
    );
}

const useStyles = makeStyles({
    root1: {
        margin:'5px',
    },
    media: {
        height: 100,
    },
    root:{
        width:'100%',
        // margin:'8px',
        overflow:'hidden'
    },ChildDiv:{
        // maxWidth: window.innerWidth,
        display:'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        overflowX:'hidden',
        height:'100vh',
        position: 'relative',
        top:'66px',
        // height: `calc(100vh - 100px)`
    },headerDiv:{
        zIndex:250,
        position:'fixed',
        width: '100%'
    },containData:{
        height: `calc(100vh - 64px)`
    },loader:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }

});
const mapDispatchToProps = (dispatch) => {
    return {
        getAllLazyCategory: node => dispatch(getAllLazyCategory(node)),
    };
};

export default (connect(null,mapDispatchToProps)(SortableComponent));