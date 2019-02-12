import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import {Route, Switch} from 'react-router-dom';
import UsersPanel from './user/UsersPanel';
import RoomsPanel from './room/RoomsPanel';
import RestaurantSetting from "./setting/RestaurantSetting";
import RestaurantSettingEdit from "./setting/RestaurantSettingEdit";

class Configuration extends React.Component {
  render() {
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Switch>
            <Route path="/config" exact component={RestaurantSetting}/>
            <Route path="/config/setting" component={RestaurantSettingEdit}/>
            <Route path="/config/rooms" component={RoomsPanel}/>
            <Route path="/config/users" component={UsersPanel}/>
          </Switch>
        </Grid>
      </Grid>
    );
  }
}


export default Configuration;