import React from 'react';
import {Route, Switch} from "react-router-dom";
import RoomsTable from "./RoomsTable";
import RoomConstructor from "./RoomConstructor";

class RoomsPanel extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/config/rooms" exact component={RoomsTable}/>
        <Route path="/config/rooms/:id" component={RoomConstructor}/>
      </Switch>
    );
  }
}

export default RoomsPanel;