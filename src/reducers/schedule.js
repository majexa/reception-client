export default (state = {}, action) => {

  switch (action.type) {
    case 'INIT_SCHEDULE':
      return Object.assign({}, state, {
        date: '',
        time: ''
      });
    case 'CHANGE_SCHEDULE_DATE':
      return Object.assign({}, state, {
        date: action.date
      });
    case 'CHANGE_SCHEDULE_TIME':
      return Object.assign({}, state, {
        time: action.time
      });
    case 'SET_SCHEDULE_STORED':
      return Object.assign({}, state, {
        stored: action.stored
      });
    default:
      return state;
  }

}