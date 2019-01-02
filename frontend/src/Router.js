import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import SignIn from './component/SignIn/';
import Reservation from './page/Reservation';
import Daily from './page/Daily';
import Search from './page/Search';
import Configuration from './page/configuration/Configuration';
import Dashboard from './component/Dashboard/Dashboard';
//import SwipeableRoutes from 'react-swipeable-routes';
import redirecter from './router/redirecter'
import {observer} from "mobx-react";

const NotFound = () => {
  return <h1>Not found</h1>;
};

const EnhanceRedirect = observer(() => {
  return redirecter.path ? <Redirect to={redirecter.path}/> : null;
});

export {EnhanceRedirect};

class Router extends Component {
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
}

export default Router;