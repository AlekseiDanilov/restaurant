import React from 'react';
import Dashboard from '../../component/Dashboard/Dashboard';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import MenuList from '@material-ui/core/MenuList/MenuList';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import RoomIcon from '@material-ui/icons/MeetingRoom';
import { Link, Route, Switch } from 'react-router-dom';
import UsersPanel from './UsersPanel';
import RoomsPanel from './RoomsPanel';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  leftGrig: {
    paddingLeft: theme.spacing.unit * 2
  }
});

class Configuration extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <Dashboard number={3}>
        <Grid container>
          <Grid item xs={2}>
            <Paper>
              <MenuList>
                <MenuItem component={Link} to="/config">
                  <ListItemIcon>
                    <RoomIcon/>
                  </ListItemIcon>
                  <ListItemText inset primary="Rooms"/>
                </MenuItem>
                <MenuItem component={Link} to="/config/users">
                  <ListItemIcon>
                    <PeopleIcon/>
                  </ListItemIcon>
                  <ListItemText inset primary="Users"/>
                </MenuItem>
              </MenuList>
            </Paper>
          </Grid>
          <Grid item className={classes.leftGrig} xs={10}>
            <Paper>
              <Switch>
                <Route path="/config" exact component={RoomsPanel}/>
                <Route path="/config/users" component={UsersPanel}/>
              </Switch>
            </Paper>
          </Grid>
        </Grid>
      </Dashboard>
    );
  }
}


export default withStyles(styles)(Configuration);