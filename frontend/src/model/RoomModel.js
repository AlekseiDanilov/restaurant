import {computed, decorate, observable} from 'mobx';
import TextFieldModel from "./form/TextFieldModel";
import {positiveInt} from "../validator";

export default class RoomModel {
  id;

  name;
  width;
  length;

  nameField = null;
  widthField = null;
  lengthField = null;

  constructor(json) {
    if (json) {
      this.id = json.id;
      this.name = json.name;
      this.width = json.width;
      this.length = json.length;
    }

    this.nameField = new TextFieldModel(this, "name")
      .withLabel("Name")
      .withRequired();
    this.widthField = new TextFieldModel(this, "width")
      .withLabel("Width")
      .withRequired()
      .withValidator(positiveInt);
    this.lengthField = new TextFieldModel(this, "length")
      .withLabel("Length")
      .withRequired()
      .withValidator(positiveInt);
  }

  get hasError() {
    return !!(this.lengthField.error || this.widthField.error || this.nameField.error)
  }

  get toJS() {
    return {
      id: this.id,
      name: this.name,
      width: this.width,
      length: this.length
    }
  }
}

decorate(RoomModel, {
  id: observable,
  name: observable,
  width: observable,
  length: observable,
  nameField: observable.ref,
  widthField: observable.ref,
  lengthField: observable.ref,
  hasError: computed,
  toJS: computed
});

