import { decorate, observable } from 'mobx';
import RoomStore from './RoomStore';

export default class RootStore {
  roomStore;

  constructor() {
    this.roomStore = new RoomStore();
  }
}

decorate(RootStore, {
  roomStore: observable,
});

