import { decorate, observable, action, computed } from 'mobx';
import FurnitureModel from '../FurnitureModel';
import api from '../../api/api';

export default class RoomStore {

  furniture = [];
  rooms = [];
  load() {
    api.client.get('/api/room')
      .then(res => res.data)
      .then(rooms => this.rooms = rooms);
  }

  findById(roomId) {
    return api.client.get(`/api/room/${roomId}`)
      .then(res => res.data);
  }

  save(room) {
    return api.client.post("/api/room", room).then(res => res.data);
  };

  update(room) {
    return api.client.put("/api/room", room)
  };

  remove(room) {
    api.client.delete(`/api/room/${room.id}`)
      .then(() => {
        this.rooms.remove(room);
      })
  }

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
  rooms: observable,
  createDefaultRectFurniture: action.bound,
  createDefaultCircleFurniture: action.bound,
  rectFurniture: computed,
  circleFurniture: computed,
});