import React from 'react';
import {Route, Switch} from "react-router-dom";
import RoomsTable from "./RoomsTable";

class RoomsPanel extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/config" exact component={RoomsTable}/>
        {/*<Route path="/config/users/new" component={AddEditUserForm}/>*/}
        <Route path="/config/rooms/:id" component={() => <h1>Not found</h1>}/>
      </Switch>
    );
  }
}

export default RoomsPanel;