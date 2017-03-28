import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import Screens from './Screens';
import auth from '../actions/auth';
import initSchedule from '../actions/initSchedule';

import '../static/screens.css';
import '../static/header.css';
import '../static/buttons.css';
import '../static/spinner.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    this.profile = false;
  }

  componentWillMount() {
    auth(this.context.store.dispatch, this.context.store.getState());
    initSchedule(this.context.store.dispatch, this.context.store.getState());
  }

  componentDidMount() {
    this.context.store.dispatch({type: 'INIT_LOADING'});
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
    if (this.props.loading.loading === true) {
      return <div className="loading">
        Loading...
        <div className="loader">&nbsp;</div>
      </div>;
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
