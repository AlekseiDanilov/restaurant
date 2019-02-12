import { decorate, observable } from 'mobx';
import RoomStore from './RoomStore';
import UserStore from "./UserStore";
import RestaurantStore from "./RestaurantStore";

export default class RootStore {
  roomStore;
  userStore;

  constructor() {
    this.roomStore = new RoomStore();
    this.userStore = new UserStore();
    this.restaurantStore = new RestaurantStore();
  }
}

decorate(RootStore, {
  roomStore: observable,
  userStore: observable,
  restaurantStore: observable
});

