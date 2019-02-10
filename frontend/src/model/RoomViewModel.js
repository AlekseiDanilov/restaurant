import React from 'react';
import {action, computed, decorate, observable} from 'mobx';

export default class RoomViewModel {
  clientWidth = 1;
  clientHeight = 1;
  marginLeft = 0;

  konva = React.createRef();
  roomElement = React.createRef();
  furniturePanel = React.createRef();

  meterUnit = observable.box(1);
  store;
  hasCollision = false;

  constructor(roomStore) {
    this.store = roomStore;
  }

  setDimensions(clientWidth, clientHeight) {
    const meterUnit = Math.min(
      clientWidth / this.currentRoom.width, clientHeight / this.currentRoom.length
    );
    this.clientHeight = meterUnit * this.currentRoom.length;
    this.clientWidth = meterUnit * this.currentRoom.width;
    this.marginLeft = Math.abs(clientWidth - this.clientWidth) / 2;
    this.meterUnit.set(meterUnit.toFixed(4));
  }

  updateDimensions() {
    const {
      clientHeight: fpClientHeight,
      offsetTop: fpOffsetTop
    } = this.furniturePanel.current;
    const offsetTop = fpClientHeight + fpOffsetTop + 28;
    console.log(this.furniturePanel, offsetTop);
    const clientHeight = document.body.clientHeight - offsetTop;
    const {clientWidth} = this.roomElement.current;
    this.setDimensions(clientWidth, clientHeight);
  };

  onDropFurniture(e) {
    const {x, y, dragData, target} = e;
    const {kind} = dragData;
    const {offsetTop, offsetLeft} = target.offsetParent;
    const newF = this.store.currentRoom.addFurniture(kind);
    const {x: newX, y: newY} = this.correctFurniturePosition(newF)({
      x: x - offsetLeft,
      y: y - offsetTop
    });
    newF.setPosition(newX, newY);
    setTimeout(this.validateCollision, 0);
  }

  setFurniturePosition(f) {
    return e => {
      const {x, y} = this.correctFurniturePosition(f)(e.target.getPosition());
      f.setPosition(x, y);
    }
  }

  correctFurniturePosition(f) {
    return ({x, y}) => {
      return ({
        x: Math.max(0, Math.min(x, this.clientWidth - f.width)),
        y: Math.max(0, Math.min(y, this.clientHeight - f.height))
      })
    }
  }

  validateCollision() {
    const [layer] = this.konva.current.getLayers();
    const ch1 = [...layer.children];
    const ch2 = [...layer.children];
    this.hasCollision = !!ch1.find(g => ch2
      .filter(gg => gg !== g)
      .find(gg => this.haveIntersection(
        g.getClientRect(),
        gg.getClientRect()
      ))
    );
  };

  haveIntersection = (r1, r2) => !(
    r2.x > r1.x + r1.width ||
    r2.x + r2.width < r1.x ||
    r2.y > r1.y + r1.height ||
    r2.y + r2.height < r1.y
  );

  get currentRoom() {
    return this.store.currentRoom;
  }
}

decorate(RoomViewModel, {
  form: observable.ref,
  store: observable,
  clientWidth: observable,
  clientHeight: observable,
  marginLeft: observable,
  hasCollision: observable,
  currentRoom: computed,
  setDimensions: action.bound,
  updateDimensions: action.bound,
  validateCollision: action.bound,
  correctFurniturePosition: action.bound,
  setFurniturePosition: action.bound,
  onDropFurniture: action.bound
});