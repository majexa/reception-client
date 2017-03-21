import axios from 'axios';

export default class Request {

  constructor(store) {
    this.store = store;
  }

  get(url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then((response) => {
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