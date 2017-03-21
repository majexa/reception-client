const dummy = (state = {}, action) => {

  switch (action.type) {
    case 'SET_AUTH':
      return Object.assign({}, state, {
        profile: action.profile
      });
    case 'STORE_AUTH':
      window.localStorage.setItem('profile', JSON.stringify(action.profile));
      return Object.assign({}, state, {
        profile: action.profile
      });
    case 'LOGOUT':
      window.localStorage.removeItem('profile');
      let _state = Object.assign({}, state);
      delete _state.profile;
      return _state;
    default:
      return state;
  }

};

export default dummy