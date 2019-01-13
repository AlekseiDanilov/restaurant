import React from 'react';
import PropTypes from 'prop-types';
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import Button from "@material-ui/core/es/Button/Button";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";

export default class EnhancedDialog extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    submitBtnTitle: PropTypes.string,
    cancelBtnTitle: PropTypes.string,
    handleClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  };

  static defaultProps = {
    submitBtnTitle: "Submit",
    cancelBtnTitle: "Cancel",
    handleClose: () => {
    },
    handleSubmit: () => {
    },
    fullWidth: false,
    maxWidth: 'sm'
  };

  render() {
    const {
      isOpen,
      title,
      submitBtnTitle,
      cancelBtnTitle,
      children,
      handleClose,
      handleSubmit,
      fullWidth,
      maxWidth,
    } = this.props;

    return <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            {cancelBtnTitle}
          </Button>
          <Button onClick={handleSubmit} color="secondary" variant="contained">
            {submitBtnTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  }
}