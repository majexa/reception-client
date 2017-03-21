import React from 'react';
import {connect} from 'react-redux';
import * as axios from 'axios';
import config from '../config';
import Request from '../utils/Request';

class ScreenLogin extends React.Component {

  handleChange(event) {
    // event.stopPropagation();
    this.context.store.dispatch({
      type: 'PHONE_CHANGE',
      phone: event.target.value
    });
  }

  // componentDidMount() {
  //   new Request(this.context.store).get(config.serverUrl);
  // }

  validate() {
    if (this.props.phone.phone && this.props.phone.phone.match(/^[1-9]{1}[0-9]{10}$/)) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div style={{width: this.props.size.width + 'px'}} className={'screen sInit'}>
        <div className="cont">
          <p className="phoneField">
            <span className="phonePlus">+</span>
            <input name="phone" type="tel" placeholder="телефон"
                   value={this.props.phone.phone}
                   onChange={this.handleChange.bind(this)}
                   onKeyUp={this.handleChange.bind(this)}
            />
          </p>
          {(this.validate() ?
              <a href="#" className="button"
                onClick={this.next.bind(this)}>
                <span>
                Далее >
                </span>
              </a>
              : <a href="#" className="button"
                disabled
                onClick={this.next.bind(this)}>
                <span>Далее ></span>
              </a>
          )}
        </div>
      </div>
    );
  }

  next(event) {
    event.stopPropagation();
    this.sendSms();
    this.context.store.dispatch({
      type: 'SCREEN_CHANGE',
      screen: 'SmsCode'
    });
  }

  sendSms() {
    new Request(this.context.store)
      .get(config.serverUrl + '/api/v1/sendCode?phone=' +
      this.props.phone.phone);
  }

}

ScreenLogin.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => (state);

export default connect(
  mapStateToProps
)(ScreenLogin);


