import React from 'react';
import {connect} from 'react-redux';

class Header extends React.Component {

  render() {
    if (this.props.navigation.disableHeader) {
      return '';
    }
    return <div className="header">
      {
        this.props.navigation.prevScreen ?
          <button className="back"
                  onClick={this.back.bind(this)}>&#9664;</button>
          :
          ''
      }
      {window.innerWidth}x{window.innerHeight}

      {
        this.props.auth.profile && this.props.navigation.screen !== 'MySchedule' ?
          <button className="schedule"
                  onClick={this.gotoMySchedule.bind(this)}>
          </button>
          :
          ''
      }
    </div>
  }

  back() {
    if (!this.props.navigation.prevScreen) return;
    this.context.store.dispatch({
      type: 'SCREEN_CHANGE',
      screen: this.props.navigation.prevScreen,
      direction: 'left'
    });
  }

  gotoMySchedule() {
    this.context.store.dispatch({
      type: 'SCREEN_CHANGE',
      screen: 'MySchedule'
    });
  }

}

Header.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => (state);

export default connect(
  mapStateToProps
)(Header);
