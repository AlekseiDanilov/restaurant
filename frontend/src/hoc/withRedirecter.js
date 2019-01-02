import React from 'react';
import {EnhanceRedirect} from "../Router";

const withRedirecter = (WrappedComponent) => {

  return class extends React.Component {

    render() {
      return<React.Fragment>
        <EnhanceRedirect/>
        <WrappedComponent {...this.props}/>
      </React.Fragment>;
    }
  }
};

export default withRedirecter;