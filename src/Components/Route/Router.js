import {
    Switch,
    Route,
} from "react-router-dom";
import Dashboard from "../Dashboard";
import Controls from "../Controls";
import LoginPage from "../LoginPage";
import React from "react";

function BasicRouting() {
        const isLoggedIn=localStorage.getItem('userData')
     // console.log(isLoggedIn)
        return (
                    <Switch>
                        <Route exact path="/" component={(props)=>{
                           return  isLoggedIn!=null ? <Dashboard {...props} /> : <LoginPage />
                            }} />
                        <Route exact path="/login" component={()=>{ return <LoginPage />}} />
                        <Route exact path="/about" component={()=>{return <Controls />}} />
                    </Switch>
        )
}
export default BasicRouting;