import React from 'react';
import {connect} from 'react-redux';
import login from '../actions/login';

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
                onClick={this.login.bind(this)}>
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
    login(
      this.props.phone.phone,
      this.state.code,
      this.next.bind(this)
    )(this.context.store.dispatch);
  }

}

ScreenSmsCode.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => (state);

export default connect(
  mapStateToProps
)(ScreenSmsCode);
