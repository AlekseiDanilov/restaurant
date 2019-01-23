import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import MenuList from '@material-ui/core/MenuList/MenuList';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import RoomIcon from '@material-ui/icons/MeetingRoom';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import {Link, Route, Switch} from 'react-router-dom';
import UsersPanel from './user/UsersPanel';
import RoomsPanel from './room/RoomsPanel';
import {Typography} from "@material-ui/core/";

class Configuration extends React.Component {
  render() {
    return (
      <Grid container spacing={8}>
        <Grid item xs={2}>
          <Paper>
            <MenuList>
              <MenuItem component={Link} to="/config">
                <ListItemIcon>
                  <RestaurantIcon/>
                </ListItemIcon>
                <ListItemText primary="Restaurant"/>
              </MenuItem><MenuItem component={Link} to="/config/rooms">
                <ListItemIcon>
                  <RoomIcon/>
                </ListItemIcon>
                <ListItemText primary="Rooms"/>
              </MenuItem>
              <MenuItem component={Link} to="/config/users">
                <ListItemIcon>
                  <PeopleIcon/>
                </ListItemIcon>
                <ListItemText primary="Users"/>
              </MenuItem>
            </MenuList>
          </Paper>
        </Grid>
        <Grid item xs={10}>
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
      Deihgraf
    </Typography>
  </React.Fragment>;
};

export default Configuration;