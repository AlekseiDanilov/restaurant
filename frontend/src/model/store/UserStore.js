import {action, decorate, observable} from 'mobx';
import api from '../../api/api';
import UserModel from '../UserModel';

export default class UserStore {
  users = [];

  load() {
    api.client.get('/api/user')
      .then(res => res.data)
      .then(users => this.users = users.map(u => new UserModel(u)));
  }

  findById(userId) {
    return api.client.get(`/api/user/${userId}`)
      .then(res => res.data);
  }

  saveUser(user) {
    return api.client.post("/api/user", user);
  };

  updateUser(user) {
    return api.client.put("/api/user", user)
  };

  deleteUser(userId) {
    api.client.delete(`/api/user/${userId}`)
      .then(() => {
        const deletedUser = this.users.find(u => u.id === userId);
        this.users.remove(deletedUser);
      })
  }

  canNotDeleteUser = (userId) => {
    const user = this.users.find(u => u.id === userId);
    return user.id !== api.user.id;
  }


}

decorate(UserStore, {
  users: observable,
  load: action.bound,
  saveUser: action.bound,
  updateUser: action.bound,
  deleteUser: action.bound,
});