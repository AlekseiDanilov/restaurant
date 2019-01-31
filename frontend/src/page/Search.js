import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import {compose} from 'recompose';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
  },

  button: {
    marginTop: theme.spacing.unit * 4,
  },

  textField: {
    marginTop: theme.spacing.unit * 3,
  }

});

class Search extends React.Component {

  render() {
    const {classes} = this.props;
    return (
      <Grid container
            direction="row"
            justify="center"
            alignItems="center">
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <form autoComplete="off">
              <TextField
                id="person"
                label="Person"
                margin="normal"
                className={classes.textField}
                fullWidth
              />
              <TextField
                id="date"
                label="Date"
                type="date"
                fullWidth
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="time"
                label="Time"
                type="time"
                fullWidth
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 900, // 15 min
                }}
              />
            </form>
            <Button variant="contained"
                    className={classes.button}
                    fullWidth
                    color="primary">
              Search
            </Button>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default compose(
  withStyles(styles)
)(Search);
