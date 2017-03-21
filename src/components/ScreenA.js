import React from 'react';
import {connect} from 'react-redux';

class ScreenA extends React.Component {

  render() {
    return (
      <div style={{width: this.props.size.width + 'px'}} className={'screen'}>
        <div className="cont">
          <h1>{this.props.content}</h1>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  size: state.size
});

export default connect(
  mapStateToProps
)(ScreenA);