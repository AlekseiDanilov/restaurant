import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import Tab from '@material-ui/core/Tab/Tab';
import Tabs from '@material-ui/core/Tabs/Tabs';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Grid from '@material-ui/core/Grid/Grid';

class ToolbarMenu extends React.Component {

  state = {
    value: -1
  };

  handleChange = (event, value) => {
    this.setState({value});
  };

  getTabValue = () => {
    const {location} = this.props;
    const {pathname} = location;
    const {value} = this.state;
    if (value > -1) return value;
    if (pathname.includes("daily")) return 1;
    if (pathname.includes("search")) return 2;
    if (pathname.includes("config")) return 3;
    return 0;
  };

  render() {
    return (
      <Grid container spacing={8}>
        <Grid item xs={9}>
          <Tabs value={this.getTabValue()} onChange={this.handleChange}>
            <Tab label="Reservations" component={Link} to="/"/>
            <Tab label="Daily plan" component={Link} to="/daily"/>
            <Tab label="Search" component={Link} to="/search"/>
            <Tab label="Configuration" component={Link} to="/config"/>
          </Tabs>
        </Grid>
        <Grid item xs={3}>
          <Grid container justify="flex-end" spacing={8}>
            <Grid item>
              <IconButton color="inherit">
                <AccountCircle/>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color="inherit" component={Link} to="/login">
                <ExitToApp/>
              </IconButton>
            </Grid>
            <Grid/>
          </Grid>
        </Grid>
      </Grid>);
  }
}

export default withRouter(ToolbarMenu);