import {decorate, observable, computed} from 'mobx';

export default class UserModel {
  id;
  name = '';
  email = '';
  username = '';
  password = '';

  constructor(userData) {
    if (userData) {
      this.id = userData.id;
      this.name = userData.name;
      this.email = userData.email;
      this.username = userData.username;
    }
  }

  get toJS() {
    return {
      id: this.id,
      name: this.name,
      username: this.name,
      email: this.email,
      password: this.password,
    }
  }
}

decorate(UserModel, {
  id: observable,
  name: observable,
  email: observable,
  username: observable,
  password: observable,
  toJS: computed
});