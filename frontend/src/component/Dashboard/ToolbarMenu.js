import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import Tab from '@material-ui/core/Tab/Tab';
import Tabs from '@material-ui/core/Tabs/Tabs';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Grid from '@material-ui/core/Grid/Grid';
import api from "../../api/api";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";
import TabMenu from "./TabMenu";

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
            <TabMenu label="Configuration" config={[
              {title: "Restaurant", link: "/config", icon: null},
              {title: "Rooms", link: "/config/rooms", icon: null},
              {title: "Users", link: "/config/users", icon: null}
            ]}/>
          </Tabs>
        </Grid>
        <Grid item xs={3}>
          <Grid container justify="flex-end" spacing={8}>
            <Grid item>
              <Tooltip title={api.user.name} placement="left">
                <IconButton color="inherit">
                  <AccountCircle/>
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" onClick={api.logout}>
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