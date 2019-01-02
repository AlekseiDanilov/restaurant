import React from 'react';
import PropTypes from 'prop-types';
import api from '../../api/api'

import {Button, CssBaseline, FormControl, Chip, Input, InputLabel, Paper, Typography,} from '@material-ui/core';

import style from './style';

import withStyles from '@material-ui/core/styles/withStyles';
import withRedirecter from "../../hoc/withRedirecter";

class SignIn extends React.Component {

  state = {
    username: "",
    password: "",
    error: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleLogin = () => {
    const {password, username} = this.state;
    api.login(username, password).then(user => {
      if (!user) {
        this.setState({error: "Please, enter valid username and password"});
      }
    })
  };

  render() {

    const {classes} = this.props;
    const {error} = this.state;

    return (
      <main className={classes.main}>
        <CssBaseline/>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" fullWidth>
              {error &&
              <Chip color='secondary'
                    label={error}
                    onDelete={() => {
                      this.setState({error: ''})
                    }}/>
              }
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="email">Username</InputLabel>
              <Input id="username"
                     name="username"
                     autoComplete="username"
                     onChange={this.handleChange('username')}
                     autoFocus/>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password"
                     type="password"
                     id="password"
                     onChange={this.handleChange('password')}
                     autoComplete="current-password"
              />
            </FormControl>
            <Button
              onClick={this.handleLogin}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRedirecter(withStyles(style)(SignIn));