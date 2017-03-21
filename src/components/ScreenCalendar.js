import React from 'react';
import {connect} from 'react-redux';

import AuthRequest from '../utils/AuthRequest';

import 'react-date-picker/index.css';
import { DateField, Calendar } from 'react-date-picker';

class ScreenCalendar extends React.Component {

  render() {
    return <div style={{
      width: this.props.size.width + 'px',
      height: this.props.size.height + 'px'
    }} className={'screen sCalendar'}>
      <div className="cont">
        <p>Введите желаемое время приёма</p>
        <p>
        <input type="date"
               onChange={this.dateChanged.bind(this)}
               value={this.props.schedule.date}
        />
        </p>
        <p>
        <input type="text"
               onChange={this.timeChanged.bind(this)}
               value={this.props.schedule.time}
        />
        </p>
        {
          this.props.schedule.date && this.props.schedule.time
          ?
            <div>
              <p>Вы записываетесь на {this.props.schedule.date} {this.props.schedule.time}</p>
              <a href="#" className="button"
                 onClick={this.sign.bind(this)}><span>Записаться</span></a>
            </div>
            :
            ''
        }
      </div>
    </div>
  }

  sign(event) {
    event.preventDefault();
    if (!this.props.auth.profile) {
      this.context.store.dispatch({
        type: 'SCREEN_CHANGE',
        screen: 'Login'
      });
    } else {
      new AuthRequest(
        this.context.store,
        this.props.auth.profile
      ).post('mySchedule', {
        date: new Date(this.props.schedule.date + ' ' + this.props.schedule.time)
      }).then(() => {
        this.context.store.dispatch({
          type: 'SET_SCHEDULE_STORED',
          stored: true
        });
        this.context.store.dispatch({
          type: 'SCREEN_CHANGE',
          screen: 'MySchedule'
        });
      });
    }
  }

  dateChanged(event) {
    this.context.store.dispatch({
      type: 'CHANGE_SCHEDULE_DATE',
      date: event.target.value
    });
  }

  timeChanged(event) {
    this.context.store.dispatch({
      type: 'CHANGE_SCHEDULE_TIME',
      time: event.target.value
    });
  }

}

ScreenCalendar.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => (state);

export default connect(
  mapStateToProps
)(ScreenCalendar);


