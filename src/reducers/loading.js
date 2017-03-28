export default (state = {}, action) => {

  switch (action.type) {
    case 'INIT_LOADING':
      return Object.assign({}, state, {
        loading: false
      });
    case 'SET_LOADING':
      return Object.assign({}, state, {
        loading: action.loading
      });
    default:
      return state;
  }

};