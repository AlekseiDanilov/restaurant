import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UserTable from './UserTable';
import NewUserForm from './NewUserForm';

class UsersPanel extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/config/users" exact component={UserTable}/>
        <Route path="/config/users/new" exact component={NewUserForm}/>
      </Switch>
    );
  }
}


export default UsersPanel;