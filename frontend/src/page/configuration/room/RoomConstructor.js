import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import FurniturePanel from "./FurniturePanel";
import EditRoomPanel from "./EditRoomPanel";

class RoomConstructor extends React.Component {
  render() {
    return (
      <Grid container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={8}>
        <Grid item>
          <FurniturePanel/>
        </Grid>
        <Grid item xs={12}>
          <EditRoomPanel/>
        </Grid>
      </Grid>
    );
  }
}

export default RoomConstructor;