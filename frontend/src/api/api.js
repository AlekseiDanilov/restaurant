import axios from 'axios';
import {Base64} from 'js-base64';
import Cookies from 'js-cookie';
import UserModel from '../model/UserModel';
import redirecter from '../router/redirecter';


class Api {
  client;
  user;
  roles;

  constructor() {
    this.client = axios.create();
    this.user = this.userFromToken(Cookies.get("restaurant-jwt"));
    this.client.interceptors.response.use(null, err => {
      const {response} = err;
      const {status} = response;
      if (status === 401) {
        redirecter.to('/login');
      }
      throw err;
    });
  }

  login = (username, password) => {
    return this.client
      .post("/api/auth/login", {
        username,
        password
      })
      .then(({data}) => data.token)
      .then(this.userFromToken)
      .then(user => {
        if (user) {
          redirecter.to('/');
        }
        return user;
      })
  };

  logout = () => {
    return this.client
      .get("/api/auth/logout")
      .then(({data}) => data.token)
      .then(this.userFromToken)
      .then(() => {
        redirecter.to('/login');
      })
  };

  verify = () => {
    return this.client
      .get("/api/auth/verify")
      .then(({data}) => data.ok)
      .then(ok => {
        if (!ok) throw new Error('verifying failed');
        return ok;
      })
  };

  userFromToken = token => {
    if (!token) {
      this.user = null;
      return null;
    }
    try {
      const payloadBase64 = token.split(".")[1];
      const payloadRow = Base64.decode(payloadBase64);
      const payload = JSON.parse(payloadRow);
      const {user, roles} = payload;
      this.user = new UserModel(user);
      this.roles = roles || [];
    } catch (e) {
      this.user = null;
    }
    return this.user;
  };
}

const api = new Api();
export default api;