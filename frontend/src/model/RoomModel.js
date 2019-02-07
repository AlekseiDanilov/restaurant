import {action, computed, decorate, observable} from 'mobx';
import FurnitureModel from "./FurnitureModel";
import FormBuilder from "./form/FormBuilder";
import {positiveInt} from "../validator/index";

export default class RoomModel {
  id;
  name;
  width;
  length;
  furniture = [];

  form;

  viewModel;

  constructor(viewModel, json) {
    this.viewModel = viewModel;
    if (json) {
      this.id = json.id;
      this.name = json.name;
      this.width = json.width;
      this.length = json.length;
      this.furniture = json.furniture.map(f => new FurnitureModel(this.viewModel.meterUnit, f))
    }
    this.form = new FormBuilder(this)
      .text("name", f => f.withLabel("Name").required())
      .text("width", f => f.withLabel("Width").required().withValidator(positiveInt))
      .text("length", f => f.withLabel("Length").required().withValidator(positiveInt));
  }


  addFurniture(kind, x = 0, y = 0) {
    this.furniture.push(new FurnitureModel(this.viewModel.meterUnit, {
      kind,
      x: x,
      y: y,
      number: this.nextFurnitureNumber
    }))
  }

  removeFurniture(frnt) {
    this.furniture.remove(frnt);
  }

  get isErrorNumbers() {
    const hasEmpty = !!this.furniture.find(f => !f.number);

    const hasNonUnique = !!this.furniture
      .find(f => this.furniture.find(ff => f.number === ff.number && f !== ff));

    return hasEmpty || hasNonUnique;
  }

  get nextFurnitureNumber() {
    const maxNumber = Math.max(
      ...this.furniture.map(f => f.number)
        .map(n => Number(n))
        .filter(n => !isNaN(n))
    );
    return (!!maxNumber && this.furniture.length > 0 ? maxNumber + 1 : 1) + '';
  }

  get toJS() {
    return {
      id: this.id,
      name: this.name,
      width: this.width,
      length: this.length,
      furniture: this.furniture.map(f => f.toJS)
    }
  }
}

decorate(RoomModel, {
  id: observable,
  name: observable,
  width: observable,
  length: observable,
  furniture: observable,
  form: observable.ref,
  loadFurniture: action.bound,
  addFurniture: action.bound,
  removeFurniture: action.bound,
  isErrorNumbers: computed,
  nextFurnitureNumber: computed,
  toJS: computed
});