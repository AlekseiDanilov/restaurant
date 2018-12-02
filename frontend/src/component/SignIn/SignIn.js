import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography
} from '@material-ui/core';

import style from './style';

import withStyles from '@material-ui/core/styles/withStyles';

function SignIn(props) {
  const {classes} = props;

  return (
    <main className={classes.main}>
      <CssBaseline/>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus/>
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password"/>
          </FormControl>
          <Button
            type="submit"
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

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(SignIn);