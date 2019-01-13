import React from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import MuiTextField from "@material-ui/core/TextField/TextField";
import TextFieldModel from "../../model/form/TextFieldModel";

class TextField extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(TextFieldModel)
  };

  render() {
    const {model, ...props} = this.props;
    return (
      <MuiTextField
        id={model.name}
        label={model.label}
        //value={model.value}
        onChange={model.onChange}
        {...props}
      />
    );
  }
}

export default observer(TextField);