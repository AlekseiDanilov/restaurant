import React from 'react';
import EnhancedDialog from "../../../component/EnhancedDialog";
import TextField from "../../../component/form/TextField";
import {inject, observer} from "mobx-react";
import {decorate, observable} from "mobx";
import {createViewModel} from "mobx-utils";
import {compose} from "recompose";
import TextFieldModel from "../../../model/form/TextFieldModel";

class ChangeFurnitureNumberDialog extends React.Component {

  numberField;
  viewModel;

  constructor(props) {
    super(props);
    const {roomStore} = props;
    const {furnitureContextMenuModel} = roomStore;
    const {furniture: model} = furnitureContextMenuModel;
    this.viewModel = createViewModel(model);

    this.numberField = new TextFieldModel(this.viewModel, "number")
      .withLabel("New number").required();
  }

  handleSubmit = e => {
    const {handleClose} = this.props;
    e.preventDefault();
    this.viewModel.submit();
    handleClose();
  };

  render() {
    const {isOpen, handleClose} = this.props;
    return (
      <EnhancedDialog isOpen={isOpen}
                      title="Change number"
                      handleClose={handleClose}
                      handleSubmit={this.handleSubmit}
                      disabledSubmit={false}
                      maxWidth="sm"
      >
        <form onSubmit={this.handleSubmit}>
          <TextField
            model={this.numberField}
            margin="normal"
            fullWidth
          />
        </form>
      </EnhancedDialog>
    );
  }
}

decorate(ChangeFurnitureNumberDialog, {
  numberField: observable
});

export default compose(
  inject('roomStore'),
  observer,
)(ChangeFurnitureNumberDialog);