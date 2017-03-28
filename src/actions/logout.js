export default (dispatch) => {
  window.localStorage.removeItem('profile');
  dispatch({
    type: 'LOGOUT'
  });
  dispatch({
    type: 'SCREEN_CHANGE',
    screen: 'Login',
    direction: 'left'
  });
};