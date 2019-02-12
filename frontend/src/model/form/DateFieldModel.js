import TextFieldModel from "./TextFieldModel";
import moment from 'moment';
import {decorate, action} from "mobx";

export default class DateFieldModel extends TextFieldModel {
  defaultValue = moment();

  onChange(value) {
    this.model[this.fieldName] = value;
  }
}

decorate(DateFieldModel, {
  onChange: action.bound
});