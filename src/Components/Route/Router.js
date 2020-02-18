import {
    Switch,
    Route,
} from "react-router-dom";
import Dashboard from "../Dashboard";
import Controls from "../Controls";
import LoginPage from "../LoginPage";
import React from "react";

function BasicRouting() {
        return (
                    <Switch>
                        <Route exact path="/" component={()=>{return <LoginPage />}} />
                        <Route exact path="/users" component={(props)=>{return <Dashboard/>}} />
                        <Route exact path="/about" component={(props)=>{return <Controls />}} />
                    </Switch>
        )
}

export default BasicRouting;