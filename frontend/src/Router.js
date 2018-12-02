import React from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom";
import SignIn from "./component/SignIn/";
import Dashboard from "./component/Dashboard/";

const NotFound = () => {
  return <h1>Not found</h1>;
};

export default () => {
  return <BrowserRouter>
    <Switch>
      <Route path="/" exact  component={Dashboard}/>
      <Route path="/login" component={SignIn}/>
      <Route exact comp={NotFound}/>
    </Switch>
  </BrowserRouter>
};