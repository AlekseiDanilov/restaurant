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
    const {name, label, value, defaultValue, error, onChange} = model;
    return (
      <MuiTextField
        error={!!error}
        id={name}
        label={label}
        value={value || defaultValue}
        onChange={onChange}
        helperText={error}
        {...props}
      />
    );
  }
}

export default observer(TextField);