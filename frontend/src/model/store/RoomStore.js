import { decorate, observable, action, computed } from 'mobx';
import FurnitureModel from '../FurnitureModel';

export default class RoomStore {
  furniture = [];

  constructor() {
    this.createDefaultCircleFurniture();
    this.createDefaultRectFurniture();
  }

  createDefaultRectFurniture() {
    this.furniture.push(new FurnitureModel('rect', 40, 50, 80, 55));
    this.furniture.push(new FurnitureModel('rect', 160, 60, 40, 40));
  }

  createDefaultCircleFurniture() {
    this.furniture.push(new FurnitureModel('circle', 280, 75, 70, 70));
    this.furniture.push(new FurnitureModel('circle', 360, 70, 40, 40));
  }

  get rectFurniture() {
    return this.furniture.filter(f => f.kind === 'rect');
  }

  get circleFurniture() {
    return this.furniture.filter(f => f.kind === 'circle');
  }
}

decorate(RoomStore, {
  furniture: observable,
  createDefaultRectFurniture: action.bound,
  createDefaultCircleFurniture: action.bound,
  rectFurniture: computed,
  circleFurniture: computed,
});