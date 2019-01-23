import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import FurniturePanel from "./FurniturePanel";
import EditRoomPanel from "./EditRoomPanel";

class RoomConstructor extends React.Component {
  render() {
    return (
      <Grid container
            alignItems="flex-start"
            spacing={8}
            justify="center"
            direction="row">
        <Grid item xs={10}>
          <EditRoomPanel/>
        </Grid>
        <Grid item xs={2}>
          <FurniturePanel/>
        </Grid>
      </Grid>
    );
  }
}

export default RoomConstructor;