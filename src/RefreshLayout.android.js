'use strict';
import React, { useRef, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  requireNativeComponent,
  View,
  PanResponder,
} from 'react-native';
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
  const offsetRef = useRef(0);
  const panResponderRef = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => {
        if (offsetRef.current >= 2) {
          //满足条件捕获事件
          return true;
        }
        return false;
      },
    }),
  );

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

  const offsetCallback = useCallback(
    (event) => {
      const { offset } = event.nativeEvent;
      offsetRef.current = offset;
      onChangeOffset && onChangeOffset(event);
    },
    [onChangeOffset],
  );

  const build = useMemo(() => {
    let height = 0;
    const newChildren = React.Children.map(children, (element) => {
      const type =
        element && typeof element.type === 'object' ? element.type : {};
      if (type.displayName === 'RCTRefreshHeader') {
        if (enable) {
          const elementProps = element.props;
          const flattenStyle = StyleSheet.flatten(
            elementProps && elementProps.style ? elementProps.style : {},
          );
          height = flattenStyle.height;
          return element;
        } else {
          return null;
        }
      } else {
        return element;
      }
    });
    return {
      children: newChildren,
      headerHeight: height,
    };
  }, [children, enable]);

  return (
    <View style={styles.layoutStyle}>
      <RCTRefreshLayout
        {...panResponderRef.current.panHandlers}
        ref={forwardedRef}
        style={styles.layoutStyle}
        enable={enable}
        refreshing={refreshing}
        onChangeOffset={offsetCallback}
        onChangeState={onChangeState}
        headerHeight={build.headerHeight}
      >
        {build.children}
      </RCTRefreshLayout>
    </View>
  );
}

const styles = StyleSheet.create({
  layoutStyle: {
    flex: 1,
    overflow: 'hidden',
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
