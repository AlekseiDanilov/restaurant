import {decorate, observable, action, computed} from 'mobx';
import {required} from "../../validator"

export default class TextFieldModel {

  model = null;
  fieldName = '';
  validators = [];
  defaultValue = '';

  constructor(model, fieldName) {
    this.model = model;
    this.fieldName = fieldName;
  }

  onChange(e) {
    this.model[this.fieldName] = e.target.value;
  }

  required() {
    this.validators.push(required);
    return this;
  }

  withValidator(validator) {
    this.validators.push(validator);
    return this;
  }

  get error() {
    const value = this.model[this.fieldName];
    const validator = this.validators.find(v => !v.validate(value));
    return validator ? validator.message : "";
  }

  withLabel(label) {
    this.label = label;
    return this;
  }

  get value() {
    return this.model[this.fieldName];
  }
}

decorate(TextFieldModel, {
  model: observable,
  onChange: action.bound,
  value: computed,
  error: computed
});