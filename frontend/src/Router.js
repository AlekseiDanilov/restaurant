import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './component/SignIn/';
import Reservation from './page/Reservation';
import Daily from './page/Daily';
import Search from './page/Search';
import Configuration from './page/configuration/Configuration';

const NotFound = () => {
  return <h1>Not found</h1>;
};

export default () => {
  return <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Reservation}/>
      <Route path="/daily" exact component={Daily}/>
      <Route path="/search" exact component={Search}/>
      <Route path="/config" exact component={Configuration}/>
      <Route path="/login"  exact component={SignIn}/>
      <Route component={NotFound}/>
    </Switch>
  </BrowserRouter>;
};