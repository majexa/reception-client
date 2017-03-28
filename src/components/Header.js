import React from 'react';
import {connect} from 'react-redux';
import logout from '../actions/logout';

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
      <div className="windowSize">
        {window.innerWidth}x{window.innerHeight}
        : {this.props.navigation.screen}
      </div>
      {this.renderAuthorizedButtons()}
    </div>
  }

  renderAuthorizedButtons() {
    if (!this.props.auth.profile) {
      return '';
    }
    const buttons = [];
    if (this.props.navigation.screen !== 'MySchedule') {
      buttons.push(
        <button key="schedule" className="schedule"
                onClick={this.gotoMySchedule.bind(this)}>
        </button>
      );
    }
    buttons.push(
      <button key="logout" className="logout"
              onClick={this.logout.bind(this)}
              >
      </button>
    );
    return buttons;
  }

  logout() {
    logout(this.context.store.dispatch);
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
