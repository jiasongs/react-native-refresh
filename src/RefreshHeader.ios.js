'use strict';
import React, { useRef, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  ViewPropTypes,
  requireNativeComponent,
} from 'react-native';
import PropTypes from 'prop-types';
import State from './RefreshState';

function RefreshHeader(props) {
  const {
    children,
    style,
    refreshing,
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
    [onEndRefresh, onPullingRefresh, onRefresh],
  );

  const buildStyles = useMemo(() => {
    const flattenStyle = StyleSheet.flatten(style);
    if (!flattenStyle.height) {
      console.warn('style中必须设置固定高度');
    }
    return {
      style: [style, styles.positionStyle],
    };
  }, [style]);

  return (
    <RCTRefreshHeader
      ref={forwardedRef}
      style={buildStyles.style}
      refreshing={refreshing}
      onChangeOffset={onChangeOffset}
      onChangeState={onChangeState}
    >
      {children}
    </RCTRefreshHeader>
  );
}

const styles = StyleSheet.create({
  positionStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});

RefreshHeader.propTypes = {
  style: ViewPropTypes.style,
  refreshing: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired, // 刷新中
  onPullingRefresh: PropTypes.func, // 松开就可以进行刷新
  onEndRefresh: PropTypes.func, // 刷新结束, 但是动画还未结束
  onIdleRefresh: PropTypes.func, // 闲置状态或者刷新完全结束
  onChangeOffset: PropTypes.func,
};

RefreshHeader.defaultProps = {
  refreshing: false,
};

const RCTRefreshHeader = requireNativeComponent('RCTRefreshHeader');

const MemoRefreshHeader = React.memo(RefreshHeader);

const ForwardRefreshHeader = React.forwardRef((props, ref) => (
  <MemoRefreshHeader forwardedRef={ref} {...props} />
));

ForwardRefreshHeader.displayName = 'RefreshHeader';

export default ForwardRefreshHeader;
