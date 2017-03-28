import axios from 'axios';
import config from '../config';

export default (state, data) => {
  if (!state.auth.profile.token) {
    throw new Error('not authorized');
  }
  data.headers = {
    'Authorization': 'Bearer ' + state.auth.profile.token
  };
  data.url = 'http://' + config.serverHost + ':' + //
    config.serverPort + '/api/v1/' + data.path;
  return axios(data);
}