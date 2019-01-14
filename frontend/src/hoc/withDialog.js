import React from 'react';

const withDialog = Dialog => WrappedComponent => {

  return class extends React.Component {

    state = {
      isOpen: false
    };

    handleClose = () => {
      const isOpen = false;
      this.setState({isOpen});
    };

    handleOpen = () => {
      const isOpen = true;
      this.setState({isOpen});
    };

    render() {
      const {...props} = this.props;
      const {isOpen} = this.state;
      return <React.Fragment>
        { isOpen &&
          <Dialog isOpen={isOpen} handleClose={this.handleClose} {...props}/>
        }
        <WrappedComponent openDialog={this.handleOpen} {...props}/>
      </React.Fragment>;
    }
  };
};

export default withDialog;