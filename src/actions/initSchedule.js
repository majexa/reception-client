import authRequest from '../utils/authRequest';

export default (dispatch, state) => {
  dispatch({
    type: 'INIT_SCHEDULE',
  });
  if (!state.auth.profile) return;
  const dateformat = require('dateformat');
  authRequest(state, {
    method: 'get',
    path: 'mySchedule'
  }).then((r) => {
    if (!r.data[0] || !r.data[0].date) return;
    const date = new Date(r.data[0].date);
    dispatch({
      type: 'CHANGE_SCHEDULE_DATE',
      date: dateformat(date, 'yyyy-mm-dd')
    });
    dispatch({
      type: 'CHANGE_SCHEDULE_TIME',
      time: dateformat(date, 'HH:MM')
    });
    dispatch({
      type: 'SET_SCHEDULE_STORED',
      stored: true
    });
  });
};