import authRequestIface from '../utils/authRequestIface';

export default (state, dispatch, date, time) => {
  authRequestIface(state, dispatch, {
      method: 'post',
      path: 'mySchedule',
      data: {
        date: new Date(date + ' ' + time)
      }
    },
    () => {
      dispatch({
        type: 'SET_SCHEDULE_STORED',
        stored: true
      });
      dispatch({
        type: 'SCREEN_CHANGE',
        screen: 'MySchedule'
      });
    }
  );
};