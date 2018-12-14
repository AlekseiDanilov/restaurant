import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import SignIn from './component/SignIn/';
import Reservation from './page/Reservation';
import Daily from './page/Daily';
import Search from './page/Search';
import Configuration from './page/configuration/Configuration';
import Dashboard from './component/Dashboard/Dashboard';
//import SwipeableRoutes from 'react-swipeable-routes';

const NotFound = () => {
  return <h1>Not found</h1>;
};

export default class Router extends Component {
  render() {
    return <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={SignIn}/>
        <Dashboard>
          {/*<SwipeableRoutes>*/}
            <Route path="/" exact component={Reservation}/>
            <Route path="/daily" component={Daily}/>
            <Route path="/search" component={Search}/>
            <Route path="/config" component={Configuration}/>
          {/*</SwipeableRoutes>*/}
        </Dashboard>
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>;
  }
};