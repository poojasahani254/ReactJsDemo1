import {
    Switch,
    Route,
} from "react-router-dom";
import React from "react";


import Dashboard from "../Dashboard";
import Controls from "../Controls";
import LoginPage from "../LoginPage";
import IndexPage from "../index";
import ArrayExample from '../ArrayExample';
import ImageUpload from '../ImageUpload';
import SimpleDemo from '../SimpleDemo';
import PageNotFound from "../PageNotFund";

function BasicRouting() {
        const isLoggedIn=localStorage.getItem('userData')
     // console.log(isLoggedIn)
        return (
                    <Switch>
                        <Route exact path="/" component={(props)=>{
                           return  isLoggedIn!=null ? <Dashboard {...props} /> : <LoginPage {...props} />
                            }} />
                        <Route exact path="/login" component={()=>{ return <LoginPage />}} />
                        <Route exact path="/about" component={()=>{return <Controls />}} />
                        <Route exact path="/index" component={()=>{return <IndexPage />}} />
                        <Route exact path="/Array" component={ArrayExample} />
                        <Route exact path="/ImageUpload" component={ImageUpload} />
                        <Route exact path="/Demo" component={SimpleDemo} />
                        <Route component={PageNotFound} />
                    </Switch>
        )
}
export default BasicRouting;