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
      <Route path="/daily" component={Daily}/>
      <Route path="/search" component={Search}/>
      <Route path="/config" component={Configuration}/>
      <Route path="/login" component={SignIn}/>
      <Route component={NotFound}/>
    </Switch>
  </BrowserRouter>;
};