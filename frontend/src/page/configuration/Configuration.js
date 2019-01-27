import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import {Route, Switch} from 'react-router-dom';
import UsersPanel from './user/UsersPanel';
import RoomsPanel from './room/RoomsPanel';
import {Typography} from "@material-ui/core/";

class Configuration extends React.Component {
  render() {
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Switch>
            <Route path="/config/" exact component={FakeRestaurantPanel}/>
            <Route path="/config/rooms" component={RoomsPanel}/>
            <Route path="/config/users" component={UsersPanel}/>
          </Switch>
        </Grid>
      </Grid>
    );
  }
}

const FakeRestaurantPanel = () => {
  return <React.Fragment>
    <Typography component="h2" variant="display3" gutterBottom>
      Deichgraf
    </Typography>
  </React.Fragment>;
};

export default Configuration;