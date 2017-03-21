import React from 'react';
import {connect} from 'react-redux';

class ScreenError extends React.Component {

  render() {
    return (
      <div style={{width: this.props.size.width + 'px'}} className={'screen sInit'}>
        <div className="cont">
          <h2>{this.props.navigation.text}</h2>
          { this.props.navigation.subText ?
            <p>{this.props.navigation.subText}</p> :
            ''
          }
        </div>
      </div>
    );
  }

}

ScreenError.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => (state);

export default connect(
  mapStateToProps
)(ScreenError);


