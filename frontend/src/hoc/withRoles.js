import React from 'react';
import api from '../api/api';

const withRoles = (roles = []) => (WrappedComponent) => {

  return class extends React.Component {

    render() {
      const isAccessible = api.roles.filter(r => roles.indexOf(r) !== -1).length > 0;
      return isAccessible ? <WrappedComponent {...this.props}/> : null;
    }
  };
};

export default withRoles;