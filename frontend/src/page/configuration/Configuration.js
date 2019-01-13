import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import MenuList from '@material-ui/core/MenuList/MenuList';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import RoomIcon from '@material-ui/icons/MeetingRoom';
import { Link, Route, Switch } from 'react-router-dom';
import UsersPanel from './user/UsersPanel';
import RoomsPanel from './room/RoomsPanel';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  right: {
    //height: '80vh',
  },
});

class Configuration extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={8}>
        <Grid item xs={2}>
          <Paper>
            <MenuList>
              <MenuItem component={Link} to="/config">
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
          <Paper className={classes.right}>
            <Switch>
              <Route path="/config/" exact component={RoomsPanel}/>
              <Route path="/config/users" component={UsersPanel}/>
            </Switch>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Configuration);