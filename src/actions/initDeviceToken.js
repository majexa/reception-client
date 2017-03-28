import config from '../config';
import authRequest from '../utils/authRequest';

export default (state, currentDeviceToken) => {
  const update = (deviceToken) => {
    authRequest(state, {
      method: 'get',
      path: 'updateDeviceToken?deviceToken=' + deviceToken
    });
  };
  if (!window.PushNotification) return;
  //alert('config.androidSenderId: ' + config.androidSenderId);
  const push = window.PushNotification.init({
    android: {
      senderID: config.androidSenderId
    }
  });
  //alert('currentDeviceToken=' + currentDeviceToken);
  push.on('registration', (data) => {
    if (!currentDeviceToken ||
      data.registrationId !== currentDeviceToken) {
      update(data.registrationId);
    }
  });
  push.on('error', function (e) {
    alert(e.message);
  });
};