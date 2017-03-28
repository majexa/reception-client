import React from 'react';
import {connect} from 'react-redux';
import sign from '../actions/sign';

class ScreenCalendar extends React.Component {

  renderTime() {
    return <select
      onChange={this.timeChanged.bind(this)}
      value={this.props.schedule.time}
    >
      <option value="">время</option>
      <option value="10:00">10:00</option>
      <option value="11:00">11:00</option>
      <option value="12:00">12:00</option>
      <option value="13:00">13:00</option>
      <option value="14:00">14:00</option>
      <option value="15:00">15:00</option>
      <option value="16:00">16:00</option>
      <option value="17:00">17:00</option>
      <option value="18:00">18:00</option>
      <option value="19:00">19:00</option>
    </select>
  }

  render() {
    return <div style={{
      width: this.props.size.width + 'px',
      height: this.props.size.height + 'px'
    }} className={'screen sCalendar'}>
      <div className="cont">
        <p>Введите желаемый день и время приёма</p>
        <p>
          <input type="date"
                 onChange={this.dateChanged.bind(this)}
                 value={this.props.schedule.date}
          />
        </p>
        <p>{this.renderTime()}</p>
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
    sign(
      this.context.store.getState(),
      this.context.store.dispatch,
      this.props.schedule.date,
      this.props.schedule.time
    );
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


