import React, {Fragment} from 'react';
import {Route, Switch} from "react-router";

// // Pages 
import Users from '../../pages/Users';
import MyAccount from "../../pages/MyAccount";
import History from "../../pages/History";


const Root = () => (
    <Fragment>
        <Switch>
            <Route path="/" exact component={Users} />
            <Route path="/myaccount" exact component={MyAccount} />
            <Route path="/history" exact component={History} />
        </Switch>
    </Fragment>
);

export default Root;