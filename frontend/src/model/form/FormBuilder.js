import {action, computed, decorate, extendObservable, observable} from 'mobx';
import TextFieldModel from "./TextFieldModel";

export default class FormBuilder {

  model;
  fields = {};

  constructor(model) {
    this.model = model;
  }

  text(name, makeField) {
    const field = new TextFieldModel(this.model, name);
    extendObservable(this.fields, {
      [name]: makeField(field)
    });
    return this;
  }

  get hasError() {
    return !!Object.keys(this.fields).find(name => this.fields[name].error);
  }
}

decorate(FormBuilder, {
  model: observable,
  fields: observable.shallow,
  text: action.bound,
  hasError: computed
});

