import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import Screens from './Screens';
import AuthRequest from '../utils/AuthRequest';

import '../static/screens.css';
import '../static/header.css';
import '../static/buttons.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    this.profile = false;
  }

  componentWillMount() {
    this.setHomepage();
    this.initSchedule();
    this.initDeviceToken();
  }

  initSchedule() {
    this.context.store.dispatch({
      type: 'INIT_SCHEDULE',
    });
    if (!this.profile) return;
    const dateformat = require('dateformat');
    new AuthRequest(this.context.store, this.profile).get('mySchedule').then((schedule) => {
      if (!schedule[0] || !schedule[0].date) return;
      const date = new Date(schedule[0].date);
      this.context.store.dispatch({
        type: 'CHANGE_SCHEDULE_DATE',
        date: dateformat(date, 'yyyy-mm-dd')
      });
      this.context.store.dispatch({
        type: 'CHANGE_SCHEDULE_TIME',
        time: dateformat(date, 'HH:MM')
      });
      this.context.store.dispatch({
        type: 'SET_SCHEDULE_STORED',
        stored: true
      });
    });
  }

  initDeviceToken() {
    if (!this.profile) return;
    if (!window.GcmPushPlugin) return;
    window.onNotification = function(a) {
      alert(a);
    };
    window.GcmPushPlugin.register((result) => {
      new AuthRequest(this.context.store, this.profile).get(
        'updateDeviceToken?deviceToken=' + result.gcm
      ).then(() => {
        console.log('Device token updated successfully');
      });
    }, (err) => {
      alert(err);
    }, {
      "senderId": "650779042104",
      "jsCallback": "onNotification"
    });
  }

  authorize() {
    let profile = window.localStorage.getItem('profile');
    if (profile) {
      return this.profile = JSON.parse(profile);
    }
    return false;
  }

  setHomepage() {
    if (this.authorize()) {
      this.context.store.dispatch({
        type: 'SET_AUTH',
        profile: this.profile
      });
      this.context.store.dispatch({
        type: 'SCREEN_INIT',
        screen: 'Calendar'
      });
    } else {
      this.context.store.dispatch({
        type: 'SCREEN_INIT',
        screen: 'Login'
      });
    }
  }

  componentDidMount() {
    this.setState({
      loaded: true
    });
    document.addEventListener('deviceready', () => {
    }, false);
    this.initSize();
  }

  initSize() {
    window.addEventListener('resize', () => {
      this.context.store.dispatch({
        type: 'WINDOW_SIZE_CHANGE',
        width: window.innerWidth,
        height: window.innerHeight
      });
    });
    this.context.store.dispatch({
      type: 'WINDOW_SIZE_CHANGE',
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  render() {
    if (this.state.loaded === false) {
      return <div className="Loading">Loading...</div>;
    }
    return (
      <div className="App" style={{width: this.props.size.width}}>
        <Header/>
        <Screens/>
      </div>
    );
  }

}

App.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => (state);

export default connect(
  mapStateToProps
)(App);
