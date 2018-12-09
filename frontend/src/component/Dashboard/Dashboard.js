import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import style from './style';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import ToolbarMenu from './ToolbarMenu';

class Dashboard extends React.Component {

  render() {
    const { classes, number, children } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline/>
        <AppBar position="absolute">
          <ToolbarMenu number={number}/>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer}/>
          {children}
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Dashboard);