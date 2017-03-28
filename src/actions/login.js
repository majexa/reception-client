import config from '../config';
import * as axios from 'axios';
import initDeviceToken from './initDeviceToken';

export default (phone, code, onLogin) => {
  return (dispatch, state) => {
    const login = (onSuccess, onFails) => {
      axios.get('http://' + config.serverHost + ':' + config.serverPort + '/api/v1/login?phone=' +
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
    login((profile) => {
      window.localStorage.setItem('profile', JSON.stringify(profile));
      dispatch({
        type: 'STORE_AUTH',
        profile: profile
      });
      initDeviceToken(state, profile.deviceToken);
      onLogin();
    }, (data) => {
      if (data.error === 'no user') {
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