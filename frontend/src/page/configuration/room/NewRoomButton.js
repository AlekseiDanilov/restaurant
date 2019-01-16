import React from 'react';
import Button from "@material-ui/core/Button/Button";
import EnhancedDialog from "../../../component/EnhancedDialog";
import {compose} from "recompose";
import {inject, observer} from "mobx-react";

import withDialog from "../../../hoc/withDialog";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "../../../component/form/TextField";
import RoomModel from "../../../model/RoomModel";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 2
  }
});

class NewRoomButton extends React.Component {
  render() {
    const {openDialog, classes} = this.props;
    return (
      <Button onClick={openDialog}
              className={classes.button}
              variant="contained"
              color="primary"
      >
        Add room
      </Button>
    );
  }
}

class NewRoomDialog extends React.Component {

  model = new RoomModel();

  render() {
    const {isOpen, handleClose, roomStore} = this.props;
    return (
      <EnhancedDialog isOpen={isOpen}
                      title="Create new room"
                      handleClose={handleClose}
                      submitBtnTitle="Create"
                      handleSubmit={() => {
                        roomStore.save(this.model).then(room => {
                          roomStore.rooms.push(room);
                          handleClose();
                        });
                      }}
                      disabledSubmit={this.model.form.hasError}
                      fullWidth
      >
        <TextField
          model={this.model.form.fields.name}
          margin="normal"
          fullWidth
        />
        <TextField
          model={this.model.form.fields.width}
          margin="normal"
          fullWidth
        />
        <TextField
          model={this.model.form.fields.length}
          margin="normal"
          fullWidth
        />
      </EnhancedDialog>
    );
  }
}

export default compose(
  withStyles(styles),
  withDialog(
    compose(
      inject('roomStore'),
      observer
    )(NewRoomDialog)
  )
)(NewRoomButton);