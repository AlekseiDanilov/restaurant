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
  };

  open(f) {
    return action(({evt}) => {
      evt.preventDefault();
      const {clientX, clientY} = evt;
      this.furniture = f;
      this.left = clientX;
      this.top = clientY;
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

