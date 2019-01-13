import {decorate, observable, action, computed} from 'mobx';

export default class TextFieldModel {

  model = null;
  fieldName = '';

  constructor(model, fieldName) {
    this.model = model;
    this.fieldName = fieldName;
  }

  onChange(e) {
    this.model[this.fieldName] = e.target.value;
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
  value: computed
});