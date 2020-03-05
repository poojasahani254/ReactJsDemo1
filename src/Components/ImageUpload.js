import React, {Component} from 'react';
import Header from '../CommonComponents/AppBar';
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core";
import DragAndDrop from "../CommonComponents/DragDropFile";
import axios from 'axios';
import config from '../Components/config';

class IndexPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }

    handleDrop = (files) => {
        let fileList = this.state.files
        for (var i = 0; i < files.length; i++) {
            if (!files[i].name) return
            fileList.push(files[i].name)
        }
        this.setState({files: fileList})
    }

    readFile =(event) =>{
            const url=`${config.apiUrl}/UploadImage`
            const data = new FormData();
            data.append('fileData', event.target.files[0]);
            console.log(data)
            return axios.post(url,data).then((res)=>{
                console.log(res)
            }).catch((err)=>{
                console.log('Error Occured',err)
            })
    }

    render(){
        const {classes}=this.props
        console.log(this.props)
        return(
            <div>
                <Header />
                <React.Fragment>
                    <td>Hello</td>
                    <td>World</td>
                    <Button onClick={()=>alert('hello')} color="primary" variant={"contained"}>
                        Upload
                    </Button>
                    <DragAndDrop handleDrop={this.handleDrop} >
                        <div className={classes.DropDiv}>
                            {this.state.files.map((file) =>
                                <div key={file}>{file}</div>
                            )}
                        </div>

                    </DragAndDrop>
                        <div className={classes.InnerDivBorder}>
                            <input type="file" accept="image/*"
                                   onChange={(event)=> { this.readFile(event) }}/>
                            {/*<Input*/}
                            {/*    type={'file'}*/}
                            {/*    name={`${site}.proposedAttachment`}*/}
                            {/*    accept=".jpg,.jpeg,.png,.docx,.pdf"*/}
                            {/*    onChange={fileValidation}*/}
                            {/*/>*/}
                        </div>

                </React.Fragment>

            </div>

        )
    }
}

const style={
    DropDiv :{
        height: 300,
        width: 250,
        border:1,
        borderColor:'black'
    },OutDivBorder:{
        border: 'dashed grey 4px',
        backgroundColor: 'rgba(255,255,255,.8)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999
    },InnerDivBorder:{
        position: 'absolute',
        top: '50%',
        right: 0,
        left: 0,
        textAlign: 'center',
        color: 'grey',
        fontSize: 36
    }
}
export default withStyles(style)(IndexPage);