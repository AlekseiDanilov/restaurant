import {decorate, observable, action} from 'mobx';

class Redirecter {
  path;

  to = path => {
    this.path = path;
  }
}

decorate(Redirecter, {
  path: observable,
  to: action
});

const redirecter = new Redirecter();
export default redirecter;