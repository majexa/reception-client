import React from 'react';
import {connect} from 'react-redux';
import * as axios from 'axios';
import config from '../config';

class ScreenSmsCode extends React.Component {

  constructor(props) {
    super(props);
    this.loginTimeoutId = 0;
    this.nextScreenTimeoutId = 0;
    this.state = {
      code: ''
    };
  }

  validate() {
    return this.state.code && this.state.code.match(/^[0-9]{5}$/);
  }

  render() {
    return (
      <div style={{width: this.props.size.width + 'px'}} className={'screen sInit'}>
        <div className="cont">
          <p>
            <input name="code" type="number" placeholder="смс код"
                   value={this.state.code}
                   onChange={this.handleChange.bind(this)}
                   onKeyUp={this.handleChange.bind(this)}
            />
          </p>
          {(this.validate() ?
              <a href="#" className="button"
                onClick={this.next.bind(this)}>
                <span>
                Войти
                </span>
              </a>
              : <a href="#" className="button"
                disabled>
                <span>
                Войти
                </span>
              </a>
          )}
        </div>
      </div>
    );
  }

  gotoLogin() {
    this.context.store.dispatch({
      type: 'SCREEN_CHANGE',
      screen: 'Login',
      direction: 'left'
    });
  }

  next() {
    if (this.nextScreenTimeoutId) {
      clearTimeout(this.nextScreenTimeoutId);
    }
    this.context.store.dispatch({
      type: 'SCREEN_CHANGE',
      screen: 'MySchedule'
    });
  }

  handleChange(event) {
    this.setState({code: event.target.value});
    if (this.validate()) {
      this.login();
    }
  }

  login() {
    if (this.loginTimeoutId) {
      clearTimeout(this.loginTimeoutId);
    }
    this.loginTimeoutId = setTimeout(() => {
      this._login();
    }, 100);
  }

  _login() {
    this.__login((data) => {
      this.context.store.dispatch({
        type: 'STORE_AUTH',
        profile: data
      });
      this.nextScreenTimeoutId = setTimeout(() => {
        this.next();
      }, 1000);
    }, (data) => {
      if (data.error == 'no user') {
        data.error = 'Неправильный код подтверждения, попробуйте ещё раз'
      }
      this.context.store.dispatch({
        type: 'SCREEN_CHANGE',
        screen: 'Error',
        text: data.error
      });
    });
  }

  __login(onSuccess, onFails) {
    axios.get(config.serverUrl + '/api/v1/login?phone=' +
      this.props.phone.phone + '&code=' + this.state.code
    ).then((response) => {
      if (response.data.error) {
        onFails(response.data);
      } else {
        onSuccess(response.data);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

}

ScreenSmsCode.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => (state);

export default connect(
  mapStateToProps
)(ScreenSmsCode);
