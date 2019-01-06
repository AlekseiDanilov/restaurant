import React from 'react';
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";
import Button from "@material-ui/core/es/Button/Button";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";

class ConfirmDialog extends React.Component {
  render() {
    const {isOpen, confirmText, handleClose, confirmAction} = this.props;
    return <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle>Please, confirm!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button>
          <Button onClick={confirmAction} color="secondary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  }
}

const withConfirmAction = (WrappedComponent) => {

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
      const {confirmAction, confirmText, ...props} = this.props;
      const {isOpen} = this.state;
      return <React.Fragment>
        <ConfirmDialog isOpen={isOpen}
                       confirmText={confirmText}
                       handleClose={this.handleClose}
                       confirmAction={() => confirmAction(this.handleClose)}/>
        <WrappedComponent {...props} openConfirmDialog={this.handleOpen}/>
      </React.Fragment>;
    }
  };
};

export default withConfirmAction;