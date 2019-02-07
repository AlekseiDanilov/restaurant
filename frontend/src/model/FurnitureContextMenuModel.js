import {action, decorate, observable} from 'mobx';

export default class FurnitureContextMenuModel {
  top = 0;
  left = 0;
  isOpen = false;
  furniture = null;

  store = null;

  constructor(roomStore) {
    this.store = roomStore;
  }

  close(e) {
    e.preventDefault();
    this.isOpen = false;
    return true;
  };

  open(f) {
    return action(({evt}) => {
      evt.preventDefault();
      evt.stopPropagation();
      const {clientX, clientY} = evt;
      this.furniture = f;
      this.left = clientX;
      this.top = clientY;
      this.isOpen = true;
      return true;
    });
  }

  openByTouch(f, pX, pY) {
    return action((e) => {
      const {currentTarget: target} = e;
      //alert(JSON.stringify(e));
      const {x: clientX, y: clientY} = target.getAttrs();
      this.furniture = f;
      this.left = clientX + pX;
      this.top = clientY + pY;
      this.isOpen = true;
    });
  }

  deleteFurniture() {
    this.store.currentRoom.removeFurniture(this.furniture);
    this.isOpen = false;
  };
}

decorate(FurnitureContextMenuModel, {
  top: observable,
  left: observable,
  isOpen: observable,
  furniture: observable,
  store: observable,
  open: action.bound,
  close: action.bound,
  deleteFurniture: action.bound
});

