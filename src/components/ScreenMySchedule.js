import React from 'react';
import {connect} from 'react-redux';

class ScreenMySchedule extends React.Component {

  getProfileContents() {
    return <div>
      <h1>Вы записались на</h1>
      <h2>{this.props.schedule.date} {this.props.schedule.time}</h2>
      <a href="#"
         className="button"
         onClick={this.gotoCalendar.bind(this)}>
        <span>Перезаписаться</span>
      </a>
    </div>
  }

  gotoCalendar(event) {
    event.preventDefault();
    this.context.store.dispatch({
      type: 'SCREEN_CHANGE',
      screen: 'Calendar',
      direction: 'left'
    });
  }

  render() {
    let contents;
    if (this.props.auth.profile) {
      contents = this.getProfileContents()
    } else {
      contents = <div>Вы не залогинены</div>
    }
    return (
      <div style={{width: this.props.size.width + 'px'}} className={'screen sInit'}>
        <div className="cont">
          {contents}
        </div>
      </div>
    );
  }

}

ScreenMySchedule.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => (state);

export default connect(
  mapStateToProps
)(ScreenMySchedule);
