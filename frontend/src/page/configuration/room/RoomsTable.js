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
import withConfirmAction from "../../../hoc/withConfirmAction";
import NewRoomButton from "./NewRoomButton";

const styles = theme => ({
  table: {
    padding: theme.spacing.unit * 2
  }
});

const DeleteButton = withConfirmAction(({openConfirmDialog}) => {
  return <Button onClick={openConfirmDialog}>
    <DeleteIcon color="secondary"/>
  </Button>
});

class RoomsTable extends React.Component {

  componentWillMount() {
    const {roomStore} = this.props;
    roomStore.load();
  }

  render() {
    const {classes, roomStore} = this.props;
    const {rooms} = roomStore;
    return (
      <React.Fragment>
        <Grid container
              alignItems="stretch"
              justify="center"
              direction="column">
          <Grid item>
            <NewRoomButton/>
          </Grid>
          <Grid item>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Number of tables</TableCell>
                  <TableCell>Number of seats</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rooms.map(room => {
                  return (
                    <TableRow key={room.id}>
                      <TableCell align="left">{room.name}</TableCell>
                      <TableCell align="left">{0}</TableCell>
                      <TableCell align="left">{0}</TableCell>
                      <TableCell align="center">
                        <Button component={Link} to={`/config/rooms/${room.id}`}>
                          <EditIcon color="primary"/>
                        </Button>
                        <DeleteButton confirmText={`Do you confirm the deletion of room ${room.name}?`}
                                          confirmAction={() => roomStore.remove(room)}/>
                      </TableCell>
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
  inject('roomStore'),
  observer
)(RoomsTable);