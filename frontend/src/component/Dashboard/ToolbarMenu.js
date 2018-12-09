import React from 'react';
import { Link } from 'react-router-dom';
import Tab from '@material-ui/core/Tab/Tab';
import Tabs from '@material-ui/core/Tabs/Tabs';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Grid from '@material-ui/core/Grid/Grid';

class ToolbarMenu extends React.Component {
  render() {
    const { number } = this.props;
    return (
      <Grid container spacing={16}>
        <Grid item xs={10}>
          <Tabs value={number}>
            <Tab label="Reservations" component={Link} to="/"/>
            <Tab label="Daily plan" component={Link} to="/daily"/>
            <Tab label="Search" component={Link} to="/search"/>
            <Tab label="Configuration" component={Link} to="/config"/>
          </Tabs>
        </Grid>
        <Grid item xs={1}>
          <IconButton color="inherit">
            <AccountCircle/>
          </IconButton>
        </Grid>
        <Grid item xs={1}>
          <IconButton color="inherit" component={Link} to="/login">
            <ExitToApp/>
          </IconButton>
        </Grid>
      </Grid>);
  }
}

export default ToolbarMenu;