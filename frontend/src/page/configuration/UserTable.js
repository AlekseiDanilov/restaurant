import React from 'react';
import Button from '@material-ui/core/Button/Button';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid/Grid';
import Table from '@material-ui/core/Table/Table';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import { withStyles } from '@material-ui/core';
import api from "../../api/api";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 2
  },
  table: {
    padding: theme.spacing.unit * 2
  }
});

class UserTable extends React.Component {

  componentWillMount() {
    api.client.get('/api/user')
      .then(res => res.data)
      .then(rows => this.setState({rows}))
  }

  state = {
    rows: []
  };

  render() {
    const {classes} = this.props;
    const {rows} = this.state;
    return (
      <React.Fragment>
        <Grid container
              alignItems="stretch"
              justify="center"
              direction="column">
          <Grid item>
            <Button component={Link}
                    className={classes.button}
                    variant="contained"
                    color="primary" to="/config/users/new">
              Add user
            </Button>
          </Grid>
          <Grid item>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell align="left" component="th" scope="row">{row.name}</TableCell>
                      <TableCell align="left">{row.username}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UserTable);