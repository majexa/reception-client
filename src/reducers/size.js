export default (state = {}, action) => {

  switch (action.type) {
    case 'WINDOW_SIZE_CHANGE':
      return {
        width: action.width,
        height: action.height
      };
    default:
      return state;
  }

}