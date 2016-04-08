import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import classnames from 'classnames';

import Notif from './Notif';

const getter = (obj, propName) => obj.get ? obj.get(propName) : obj[propName];

const styles = {
  position: 'fixed',
  top: '10px',
  right: 0,
  left: 0,
  zIndex: 1000,
  width: '80%',
  maxWidth: 400,
  margin: 'auto'
};

class Notifs extends Component {
  static propTypes = {
    theme: PropTypes.object,
    className: PropTypes.string,
    CustomComponent: PropTypes.func,
    forceNotifsStyles: PropTypes.bool,
    transitionTimeout: PropTypes.number
  }

  render() {
    const {
      notifs,
      theme,
      className,
      CustomComponent,
      forceNotifsStyles,
      transitionTimeout
    } = this.props;

    const items = notifs.map((notif) => {
      return (
        <Notif
          key={getter(notif, 'id')}
          message={getter(notif, 'message')}
          kind={getter(notif, 'kind')}
          theme={theme}
          CustomComponent={CustomComponent}
        />
      );
    });

    const componentStyles = forceNotifsStyles || !theme ? styles : {};
    const timeout = transitionTimeout || 500;

    return (
      <div className={classnames('notif-container', className)} style={componentStyles}>
        <TransitionGroup
          transitionName="notif"
          transitionEnterTimeout={timeout}
          transitionLeaveTimeout={timeout}
        >
          {items}
        </TransitionGroup>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {notifs: state.get ? state.get('notifs') : state.notifs};
  },
  {}
)(Notifs);
