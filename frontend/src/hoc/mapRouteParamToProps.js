import React from 'react';
import {withRouter} from 'react-router-dom';

const mapRouteParamToProps = (paramName, propName) => (WrappedComponent) => {

  return withRouter(class extends React.Component {

    paramValue = () => {
      const {match} = this.props;
      const {params} = match;
      return params[paramName];
    };

    render() {
      const {...props} = this.props;
      const propValue = this.paramValue();
      return <React.Fragment>
        <WrappedComponent {...{[propName]: propValue}} {...props}/>
      </React.Fragment>;
    }
  });
};

export default mapRouteParamToProps;