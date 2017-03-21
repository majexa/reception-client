import axios from 'axios';
import config from '../config';

export default class AuthRequest {

  constructor(store, profile) {
    this.store = store;
    if (!profile) {
      throw new Error('No profile in auth');
    }
    if (!profile.token) {
      throw new Error('No token in profile');
    }
    this.token = profile.token;
  }

  get(path) {
    path = config.serverUrl + '/api/v1/' + path;
    return new Promise((resolve, reject) => {
      let instance = axios.create({
        timeout: 1000,
        headers: {'Authorization': 'Bearer ' + this.token}
      });
      instance.get(path).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        let t = error.toString();
        this.store.dispatch({
          type: 'SCREEN_CHANGE',
          screen: 'Error',
          text: t === 'Error: Network Error' ? 'Нет интернета' : t
        });
      });
    });
  }

  post(path, data) {
    path = config.serverUrl + '/api/v1/' + path;
    return new Promise((resolve, reject) => {
      let instance = axios.create({
        timeout: 1000,
        headers: {'Authorization': 'Bearer ' + this.token}
      });
      instance.post(path, data).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        let t = error.toString();
        this.store.dispatch({
          type: 'SCREEN_CHANGE',
          screen: 'Error',
          text: t === 'Error: Network Error' ? 'Нет интернета' : t
        });
      });
    });
  }

}