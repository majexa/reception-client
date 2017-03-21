import React from 'react';
import {connect} from 'react-redux';

let slideNames = [
  'Init', 'TaskPhoto'
];

class Navigation extends React.Component {

  render() {
    let rows = [];
    for (let slideName of slideNames) {
      rows.push(<option key={slideName}>{slideName}</option>);
    }
    return (
      <div className="nav">
        <select onChange={this.change.bind(this)}>
          {rows}
        </select>
      </div>
    );
  }

  change(e) {
    this.context.store.dispatch({
      type: 'SCREEN_CHANGE',
      screen: e.target.value,
      direction: 'right'
    });
  }

}

Navigation.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => ({
  screen: state.navigation.screen
});

export default connect(
  mapStateToProps
)(Navigation);
