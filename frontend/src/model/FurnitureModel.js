import { decorate, observable } from 'mobx';

export default class FurnitureModel {
  kind; // TODO: for now circle or rect
  x;
  y;
  width;
  height;
  color = 'brown';

  constructor(kind, x, y, width, height) {
    this.kind = kind;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

decorate(FurnitureModel, {
  kind: observable,
  x: observable,
  y: observable,
  width: observable,
  height: observable,
});