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
    return this.figure.figureData.width * this.scale;
  }

  get height() {
    return this.figure.figureData.height * this.scale;
  }

  get offsetX() {
    return this.x - this.figure.figureData.offsetX;
  }

  get offsetY() {
    return this.y - this.figure.figureData.offsetY;
  }

  get scale() {
    return this.meterUnit.get() / this.figure.figureData.width;
  }

  get pathData() {
    return this.figure.figureData.path;
  }

  get figure() {
    return furnitureType[this.kind];
  }

  get chairs() {
    return this.figure.chairs.map((c, i) => ({
      key: i,
      data: furnitureType[c.type].path,
      x: this.x + c.offsetX,
      y: this.y + c.offsetY,
    }));
  }

  get toJS() {
    return {
      kind: this.kind,
      number: this.number,
      x: this.xMeter,
      y: this.yMeter,
      numberSeats: this.chairs.length
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
  scale: computed,
  figure: computed,
  setPosition: action.bound,
  meterUnit: observable.ref,
  toJS: computed
});