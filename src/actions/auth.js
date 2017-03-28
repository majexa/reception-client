import initDeviceToken from './initDeviceToken';

export default (dispatch, state) => {
  let profile = window.localStorage.getItem('profile');
  if (profile) {
    profile = JSON.parse(profile);
  }
  if (profile) {
    dispatch({
      type: 'SET_AUTH',
      profile
    });
    dispatch({
      type: 'SCREEN_INIT',
      screen: 'Calendar'
    });
    initDeviceToken(state, profile.deviceToken);
  } else {
    dispatch({
      type: 'SCREEN_INIT',
      screen: 'Login'
    });
  }
};
