import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import Header from '../CommonComponents/AppBar';
import object from "auth0-js/src/helper/object";
// import ImageUpload from "../CommonComponents/ImageUpload";

class Controls extends Component {
    constructor() {
        super();
        this.state = {
            // files:[],
            tasks:[
                {name:"Learn Angular",category:"wip",bgColor:"yellow"},
                {name:"Vue",category:"wip",bgColor:"pink"},
                {name:"React",category:"wip",bgColor:"red"},
                {name:"React Native",category:"wip",bgColor:"black"},
                {name:"JavaScript",category:"wip",bgColor:"gray"}
                ]
        }
    }
    componentWillUnmount() {
        // this.state.complete.forEach(file=>URL.revokeObjectURL(file.preview));
    }
    // AddFile = file=>{
    //     console.log(file)
    //     this.setState({
    //         files:file.map(file=>{
    //             Object.assign(file,{
    //                 preview:URL.createObjectURL(file)
    //             })
    //         })
    //     })
    // }
    onDragOver = (event) =>{
        event.preventDefault()
    }
    onDragStart = (event,id) =>{
        console.log("DragStart",id);
        event.dataTransfer.setData("id",id)
    }
    onDrop = (ev, cat) => {
        let id = ev.dataTransfer.getData("id");
        let tasks = this.state.tasks.filter((task) => {
            if (task.name == id) {
                task.category = cat;
            }
            return task;
        });
        this.setState({...this.state,tasks});
    }
    render() {
        debugger
        const {classes}=this.props;
        console.log(this.props)
        let task={
            wip:[],
            complete:[]
        }
        this.state.tasks.forEach((item)=>{
            task[item.category].push(
                <div
                    draggable
                    key={item.name}
                    className={classes.frmtext}
                    onDragStart={(e)=>this.onDragStart(e, item.name)}
                    style={{backroundColor:item.bgColor,height:"100px",width:"50%"}}>
                </div>
            )
        })
        return (
            <div>
                <Header />
                <div className="container-drag">
                    <h2 className="header">DRAG & DROP DEMO</h2>
                    <div className="wip"
                         onDragOver={(e)=>this.onDragOver(e)}
                         onDrop={(e)=>{this.onDrop(e, "wip")}}>
                        <span className="task-header">WIP</span>
                        {task.wip}
                    </div>
                    <div className="droppable"
                         onDragOver={(e)=>this.onDragOver(e)}
                         onDrop={(e)=>this.onDrop(e, "complete")}>
                        <span className="task-header">COMPLETED</span>
                        {task.complete}
                    </div>
                </div>
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
            color: 'red',
        }, formstyle: {
            border: 'thin solid red',
            padding: '2rem',
            margin: '2rem',
            display: 'flex',
        },input: {
            display: 'none',
        },draggable:{
            width: '50%'
        }
    }
;
export default withStyles(styles)(Controls);