import React from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import {DateTimePicker, DatePicker, TimePicker} from "material-ui-pickers";
import DateFieldModel from "../../model/form/DateFieldModel";

const Field = ({type, ...props}) => {
  switch (type) {
    case 'time': return <TimePicker {...props}/>;
    case 'dateTime': return <DateTimePicker {...props}/>;
    case 'date':
    default: return <DatePicker/>;
  }
};

class DateField extends React.Component {

  static propTypes = {
    type: PropTypes.oneOf(['time', 'dateTime', 'date']),
    model: PropTypes.instanceOf(DateFieldModel)
  };

  render() {
    const {model, ...props} = this.props;
    const {name, label, value, error, onChange} = model;
    return (
      <Field
        error={!!error}
        id={name}
        label={label}
        value={value}
        onChange={onChange}
        helperText={error}
        margin="normal"
        autoOk
        ampm={false}
        {...props}
      />
    );
  }
}

export default observer(DateField);