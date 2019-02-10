import {computed, decorate, observable, action} from 'mobx';
import {furnitureType} from "./furnitureData";

export default class FurnitureModel {
  id;
  kind = 'circle4';
  number;
  xMeter = 1;
  yMeter = 1;

  meterUnit = null;

  constructor(meterUnit, json) {
    this.meterUnit = meterUnit;
    if (json) {
      this.id = json.id;
      this.kind = json.kind;
      this.number = json.number;
      this.xMeter = json.x;
      this.yMeter = json.y;
    }
  }

  setPosition(x, y) {
    this.xMeter = (x / this.meterUnit.get()).toFixed(4);
    this.yMeter = (y / this.meterUnit.get()).toFixed(4);
  }

  get x() {
    return this.xMeter * this.meterUnit.get();
  }

  get y() {
    return this.yMeter * this.meterUnit.get();
  }

  get width() {
    return this.figure.figureData.width * this.meterUnit.get();
  }

  get height() {
    return this.figure.figureData.height * this.meterUnit.get();
  }

  get srcPath() {
    return this.figure.figureData.srcPath;
  }

  get figure() {
    return furnitureType[this.kind];
  }

  get numberSeats() {
    return this.figure.chairs;
  }

  get toJS() {
    return {
      kind: this.kind,
      number: this.number,
      x: this.xMeter,
      y: this.yMeter,
      numberSeats: this.numberSeats
    };
  }
}

decorate(FurnitureModel, {
  kind: observable,
  number: observable,
  xMeter: observable,
  yMeter: observable,
  x: computed,
  y: computed,
  width: computed,
  height: computed,
  figure: computed,
  setPosition: action.bound,
  meterUnit: observable.ref,
  toJS: computed
});