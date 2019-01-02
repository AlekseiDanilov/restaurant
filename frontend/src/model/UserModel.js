import {decorate, observable} from 'mobx';

export default class UserModel {
  id;
  name;
  email;
  username;

  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
    this.username = userData.username;
  }
}

decorate(UserModel, {
  id: observable,
  name: observable,
  email: observable,
  username: observable
});