import React from 'react';
import Button from '@material-ui/core/Button/Button';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid/Grid';
import Table from '@material-ui/core/Table/Table';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {withStyles} from '@material-ui/core';
import {inject, observer} from 'mobx-react';
import {compose} from 'recompose';
import withConfirmAction from "../../hoc/withConfirmAction";
import withRoles from "../../hoc/withRoles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 2
  },
  table: {
    padding: theme.spacing.unit * 2
  }
});

const DeleteUserButton = withConfirmAction(({openConfirmDialog}) => {
  return <Button onClick={openConfirmDialog}>
    <DeleteIcon color="secondary"/>
  </Button>
});

const AccessTableCell = withRoles('Admin')(TableCell);
const AccessButton = withRoles('Admin')(Button);

class UserTable extends React.Component {

  componentWillMount() {
    const {userStore} = this.props;
    userStore.load();
  }

  render() {
    const {classes, userStore} = this.props;
    const {users} = userStore;
    return (
      <React.Fragment>
        <Grid container
              alignItems="stretch"
              justify="center"
              direction="column">
          <Grid item>
            <AccessButton component={Link}
                    className={classes.button}
                    variant="contained"
                    color="primary" to="/config/users/new">
              Add user
            </AccessButton>
          </Grid>
          <Grid item>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <AccessTableCell align="center">Action</AccessTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => {
                  return (
                    <TableRow key={user.id}>
                      <TableCell align="left">{user.name}</TableCell>
                      <TableCell align="left">{user.username}</TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <AccessTableCell align="center">
                        <Button component={Link} to={`/config/users/${user.id}`}>
                          <EditIcon color="primary"/>
                        </Button>
                        {userStore.canNotDeleteUser(user.id) &&
                        <DeleteUserButton confirmText={`Do you confirm the deletion of user ${user.name}?`}
                                          confirmAction={() => userStore.deleteUser(user.id)}/>
                        }
                      </AccessTableCell>
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

export default compose(
  withStyles(styles),
  inject('userStore'),
  observer
)(UserTable);