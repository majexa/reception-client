import React from 'react';
import {connect} from 'react-redux';
import '../static/reception.css';

class ScreenReception extends React.Component {

  render() {
    return (
      <div style={{
        width: this.props.size.width + 'px',
        height: this.props.size.height + 'px'
      }} className={'screen sReception'}>
        <div className="cont">
          <h1>Салли массажист</h1>
          <h2>Пришло время массажа!</h2>
          <a href="#" className="button"
             onClick={this.sign.bind(this)}><span>Записаться</span></a>
        </div>
      </div>
    );
  }

  sign() {
    if (!this.props.auth.profile) {

    }
  }

  gotoCalendar(e) {
    e.preventDefault();
    // window.datePicker.show(options, onSuccess, onError);
    let eventDate;
    let eventTime;
    const onDateSelected = (date) => {
      eventDate = date;
      window.datePicker.show({
        date: new Date(),
        mode: 'time'
      }, onTimeSelected, onError);
    };
    const onTimeSelected = (time) => {
      eventTime = time;
    };
    const onError = (error) => { // Android only
    };
    if (window.datePicker) {
      window.datePicker.show({
        date: new Date(),
        mode: 'date'
      }, onDateSelected, onError);
      return;
    }
    //
    this.context.store.dispatch({
      type: 'SCREEN_CHANGE',
      screen: 'Calendar'
    });
  }

}

ScreenReception.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => (state);

export default connect(
  mapStateToProps
)(ScreenReception);


