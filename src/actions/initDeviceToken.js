import config from '../config';
import authRequest from '../utils/authRequest';

export default (state, onUpdate) => {
  const update = (deviceToken) => {
    authRequest(state, {
      method: 'get',
      path: 'updateDeviceToken?deviceToken=' + deviceToken
    });
  };
  if (!state.auth && !state.auth.profile) return;
  if (!window.PushNotification) return;
  const push = window.PushNotification.init({
    android: {
      senderID: config.androidSenderId
    }
  });
  push.on('registration', (data) => {
    if (!state.auth.profile.deviceToken) {
      update(data.registrationId);
    } else if (data.registrationId != state.auth.profile.deviceToken) {
      update(data.registrationId);
    }
    // new AuthRequest(this.context.store, this.profile).get(
    //   'updateDeviceToken?deviceToken=' + data.registrationId
    // ).then((r) => {
    //   alert(JSON.stringify(r));
    // });
  });
  push.on('error', function (e) {
    alert(e.message);
  });
};