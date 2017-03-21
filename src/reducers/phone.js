const dummy = (state = {}, action) => {

  switch (action.type) {
    case 'PHONE_CHANGE':
      return Object.assign({}, state, {
        phone: action.phone
      });
    default:
      return Object.assign({}, state, {
        phone: '79202560776'
      });
  }

};

export default dummy