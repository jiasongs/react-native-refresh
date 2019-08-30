'use strict';
import React, { useRef, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  ViewPropTypes,
  requireNativeComponent,
} from 'react-native';
import PropTypes from 'prop-types';

const State = {
  Idle: 1 /** 普通闲置状态 */,
  Pulling: 2 /** 松开就可以进行刷新的状态 */,
  Refreshing: 3 /** 正在刷新中的状态 */,
  // WillRefresh: 4 /** 即将刷新的状态 */,
  // NoMoreData: 5 /** 所有数据加载完毕，没有更多的数据了 */,
};

function RefreshBaseHeader(props) {
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
      if (state === State.Pulling) {
        console.log('onChangeState', state, '松开就可以进行刷新的状态');
        onPullingRefresh && onPullingRefresh(state);
      } else if (state === State.WillRefresh) {
        console.log('onChangeState', state, '即将刷新的状态');
      } else if (state === State.Refreshing) {
        console.log('onChangeState', state, '正在刷新中的状态');
        onRefresh && onRefresh(state);
      } else if (state === State.Idle) {
        console.log('onChangeState', state, '结束刷新');
        onEndRefresh && onEndRefresh(state);
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

RefreshBaseHeader.propTypes = {
  style: ViewPropTypes.style,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func, // 刷新中
  onPullingRefresh: PropTypes.func, // 松开就可以进行刷新
  onEndRefresh: PropTypes.func, // 刷新结束
  onChangeOffset: PropTypes.func,
};

RefreshBaseHeader.defaultProps = {
  refreshing: false,
};

const RCTRefreshHeader = requireNativeComponent('RCTRefreshHeader');

const MemoRefreshBaseHeader = React.memo(RefreshBaseHeader);

const ForwardRefreshBaseHeader = React.forwardRef((props, ref) => (
  <MemoRefreshBaseHeader forwardedRef={ref} {...props} />
));

ForwardRefreshBaseHeader.displayName = 'RefreshBaseHeader';
ForwardRefreshBaseHeader.propTypes = RefreshBaseHeader.propTypes;
ForwardRefreshBaseHeader.defaultProps = RefreshBaseHeader.defaultProps;

export default ForwardRefreshBaseHeader;
