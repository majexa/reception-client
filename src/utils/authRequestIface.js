import authRequest from './authRequest';

export default (state, dispatch, data, onSuccess) => {
  data.timeout = 10000;
  dispatch({
    type: 'SET_LOADING',
    loading: true
  });
  authRequest(state, data).then((r) => {
    dispatch({
      type: 'SET_LOADING',
      loading: false
    });
    onSuccess(r);
  }).catch((error) => {
    dispatch({
      type: 'SET_LOADING',
      loading: false
    });
    const t = error.toString();
    dispatch({
      type: 'SCREEN_CHANGE',
      screen: 'Error',
      text: t === 'Error: Network Error' ? 'Нет интернета' : t
    });
  });
};