'use strict';
import React, { useRef, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  ViewPropTypes,
  requireNativeComponent,
  RefreshControl,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';

const State = {
  Idle: 'Idle' /** 普通闲置状态 */,
  Pulling: 'Pulling' /** 松开就可以进行刷新的状态 */,
  Refreshing: 'Refreshing' /** 正在刷新中的状态 */,
  // WillRefresh: 4 /** 即将刷新的状态 */,
  // NoMoreData: 5 /** 所有数据加载完毕，没有更多的数据了 */,
};

function RefreshHeader(props) {
  const {
    children,
    style,
    refreshing,
    onPullingRefresh,
    onRefresh,
    onEndRefresh,
    onChangeOffset,
    forwardedRef,
  } = props;

  const currentState = useRef(State.Idle);

  const onChangeState = useCallback(
    (event) => {
      const { state } = event.nativeEvent;
      if (state === 2) {
        onPullingRefresh && onPullingRefresh('Pulling');
      } else if (state === 3) {
        onRefresh && onRefresh('Refreshing');
      } else if (state === 1) {
        onEndRefresh && onEndRefresh('Idle');
      }
      currentState.current = state;
    },
    [onEndRefresh, onPullingRefresh, onRefresh],
  );

  const buildStyles = useMemo(() => {
    return {
      style: [style, styles.positionStyle],
    };
  }, [style]);

  if (Platform.OS === 'android') {
    return <RefreshControl {...props} />;
  }

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
  onEndRefresh: PropTypes.func, // 刷新结束
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
