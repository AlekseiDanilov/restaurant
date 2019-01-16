import {computed, decorate, observable} from 'mobx';
import FormBuilder from "./form/FormBuilder";
import {positiveInt} from "../validator";

export default class RoomModel {
  id;

  name;
  width;
  length;

  form = null;

  constructor(json) {
    if (json) {
      this.id = json.id;
      this.name = json.name;
      this.width = json.width;
      this.length = json.length;
    }

    this.form = new FormBuilder(this)
      .text("name", f => f.withLabel("Name").required())
      .text("width", f => f.withLabel("Width").required().withValidator(positiveInt))
      .text("length", f => f.withLabel("Length").required().withValidator(positiveInt));
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
  formBuilder: observable.ref,
  toJS: computed
});

