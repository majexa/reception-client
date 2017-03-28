import config from '../config';
import * as axios from 'axios';

export default (phone, code, onLogin) => {
  return (dispatch) => {

    const login = (onSuccess, onFails) => {
      axios.get(config.serverUrl + '/api/v1/login?phone=' +
        phone + '&code=' + code
      ).then((response) => {
        if (response.data.error) {
          onFails(response.data);
        } else {
          onSuccess(response.data);
        }
      }).catch((error) => {
        console.log(error);
      });
    };

    login((data) => {
      window.localStorage.setItem('profile', data);
      dispatch({
        type: 'STORE_AUTH',
        profile: data
      });
      onLogin();
    }, (data) => {
      if (data.error == 'no user') {
        data.error = 'Неправильный код подтверждения, попробуйте ещё раз'
      }
      dispatch({
        type: 'SCREEN_CHANGE',
        screen: 'Error',
        text: data.error
      });
    });
  }
};