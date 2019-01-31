import {decorate, observable, action} from 'mobx';
import api from '../../api/api';
import RoomModel from "../RoomModel";
import FurnitureContextMenuModel from "../FurnitureContextMenuModel";

export default class RoomStore {

  rooms = [];
  currentRoom;
  furnitureContextMenuModel;

  constructor() {
    this.furnitureContextMenuModel = new FurnitureContextMenuModel(this);
  }

  load() {
    api.client.get('/api/room')
      .then(res => res.data)
      .then(rooms => this.rooms = rooms);
  }

  loadCurrentRoom(roomId) {
    return api.client.get(`/api/room/${roomId}`)
      .then(res => this.currentRoom = new RoomModel(res.data));
  }

  save(room) {
    return api.client.post("/api/room", room.toJS).then(res => res.data);
  };

  update(room) {
    return api.client.put("/api/room", room.toJS)
  };

  remove(room) {
    api.client.delete(`/api/room/${room.id}`)
      .then(() => {
        this.rooms.remove(room);
      })
  }
}

decorate(RoomStore, {
  rooms: observable,
  loadCurrentRoom: action.bound,
  currentRoom: observable,
  furnitureContextMenuModel: observable
});