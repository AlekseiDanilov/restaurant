import React from 'react';
import api from "../api/api";

const withAuthenticate = (WrappedComponent) => {

  return class extends React.Component {

    state = {
      isAuthenticate: false
    };

    handleVerify = ok => () => {
      if (ok) {
        this.setState({isAuthenticate: ok});
      }
    };

    componentDidMount() {
      api.verify()
        .then(this.handleVerify(true))
        .catch(this.handleVerify(false));
    }

    render() {
      const {isAuthenticate} = this.state;
      return isAuthenticate ? <WrappedComponent {...this.props}/> : null;
    }
  };
};

export default withAuthenticate;