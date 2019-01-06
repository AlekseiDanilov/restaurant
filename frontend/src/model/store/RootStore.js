import { decorate, observable } from 'mobx';
import RoomStore from './RoomStore';
import UserStore from "./UserStore";

export default class RootStore {
  roomStore;
  userStore;

  constructor() {
    this.roomStore = new RoomStore();
    this.userStore = new UserStore();
  }
}

decorate(RootStore, {
  roomStore: observable,
});

