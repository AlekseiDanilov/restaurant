import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UserTable from './UserTable';
import AddEditUserForm from './AddEditUserForm';

class UsersPanel extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/config/users" exact component={UserTable}/>
        <Route path="/config/users/new" component={AddEditUserForm}/>
        <Route path="/config/users/:id" component={AddEditUserForm}/>
      </Switch>
    );
  }
}


export default UsersPanel;