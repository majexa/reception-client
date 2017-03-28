const dummy = (state = {}, action) => {

  switch (action.type) {
    case 'SET_AUTH':
      return Object.assign({}, state, {
        profile: action.profile
      });
    case 'STORE_AUTH':
      return Object.assign({}, state, {
        profile: action.profile
      });
    case 'LOGOUT':
      let _state = Object.assign({}, state);
      delete _state.profile;
      return _state;
    default:
      return state;
  }

};

export default dummy