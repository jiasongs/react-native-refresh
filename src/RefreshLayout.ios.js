'use strict';
import React, { useRef, useCallback } from 'react';
import { StyleSheet, requireNativeComponent } from 'react-native';
import PropTypes from 'prop-types';
import State from './RefreshState';

function RefreshLayout(props) {
  const {
    children,
    refreshing,
    enable,
    onPullingRefresh,
    onRefresh,
    onEndRefresh,
    onIdleRefresh,
    onChangeOffset,
    forwardedRef,
  } = props;

  const currentState = useRef(1);

  const onChangeState = useCallback(
    (event) => {
      const { state } = event.nativeEvent;
      if (currentState.current !== state) {
        currentState.current = state;
        if (state === 1) {
          onIdleRefresh && onIdleRefresh(State.Idle);
        } else if (state === 2) {
          onPullingRefresh && onPullingRefresh(State.Pulling);
        } else if (state === 3) {
          onRefresh && onRefresh(State.Refreshing);
        } else if (state === 4) {
          onEndRefresh && onEndRefresh(State.End);
        }
      }
    },
    [onEndRefresh, onIdleRefresh, onPullingRefresh, onRefresh],
  );

  if (!enable) {
    return children ? children : null;
  }

  return (
    <RCTRefreshLayout
      ref={forwardedRef}
      style={styles.positionStyle}
      refreshing={refreshing}
      onChangeOffset={onChangeOffset}
      onChangeState={onChangeState}
    >
      {children}
    </RCTRefreshLayout>
  );
}

const styles = StyleSheet.create({
  positionStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});

RefreshLayout.propTypes = {
  refreshing: PropTypes.bool,
  enable: PropTypes.bool,
  onRefresh: PropTypes.func, // 刷新中
  onPullingRefresh: PropTypes.func, // 松开就可以进行刷新
  onEndRefresh: PropTypes.func, // 刷新结束, 但是动画还未结束
  onIdleRefresh: PropTypes.func, // 闲置状态或者刷新完全结束
  onChangeOffset: PropTypes.func,
};

RefreshLayout.defaultProps = {
  refreshing: false,
  enable: true,
};

const RCTRefreshLayout = requireNativeComponent('RCTRefreshLayout');

const MemoRefreshLayout = React.memo(RefreshLayout);

const ForwardRefreshLayout = React.forwardRef((props, ref) => (
  <MemoRefreshLayout forwardedRef={ref} {...props} />
));

ForwardRefreshLayout.displayName = 'RefreshLayout';

export default ForwardRefreshLayout;
