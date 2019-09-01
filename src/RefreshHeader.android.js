'use strict';
import React, { useRef, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  ViewPropTypes,
  requireNativeComponent,
  View,
  PanResponder,
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
        if (state === 1) {
          onIdleRefresh && onIdleRefresh(State.Idle);
        } else if (state === 2) {
          onPullingRefresh && onPullingRefresh(State.Pulling);
        } else if (state === 3) {
          onRefresh && onRefresh(State.Refreshing);
        } else if (state === 4) {
          onEndRefresh && onEndRefresh(State.End);
        }
        currentState.current = state;
      }
    },
    [onEndRefresh, onPullingRefresh, onRefresh],
  );

  const offsetCallback = useCallback((event) => {
    const { offset } = event.nativeEvent;
    if (offsetRef.current != offset) {
      offsetRef.current = offset;
      onChangeOffset && onChangeOffset(event);
    }
  }, []);

  const buildStyles = useMemo(() => {
    const flattenStyle = StyleSheet.flatten(style);
    if (!flattenStyle.height) {
      console.warn('style中必须设置固定高度');
    }
    return {
      style: style,
      height: flattenStyle.height,
    };
  }, [style]);

  const buildChildren = useMemo(() => {
    const headerElement = [];
    let scrollViewElement = null;
    React.Children.map(
      children,
      (item) => {
        if (item.type !== 'RCTScrollView') {
          headerElement.push(item);
        } else {
          scrollViewElement = item;
        }
      },
      [],
    );
    if (!scrollViewElement) {
      console.warn('children中必须包含scrollView');
    }
    return (
      <React.Fragment>
        <RCTRefreshHeader>
          <View style={buildStyles.style}>{headerElement}</View>
        </RCTRefreshHeader>
        {scrollViewElement}
      </React.Fragment>
    );
  }, [children]);

  return (
    <RCTRefreshLayout
      {...panResponderRef.current.panHandlers}
      ref={forwardedRef}
      style={styles.positionStyle}
      refreshing={refreshing}
      onChangeOffset={offsetCallback}
      onChangeState={onChangeState}
      headerHeight={buildStyles.height}
    >
      {buildChildren}
    </RCTRefreshLayout>
  );
}

const styles = StyleSheet.create({
  positionStyle: {
    flex: 1,
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

const RCTRefreshLayout = requireNativeComponent('RCTRefreshLayout');
const RCTRefreshHeader = requireNativeComponent('RCTRefreshHeader');

const MemoRefreshHeader = React.memo(RefreshHeader);

const ForwardRefreshHeader = React.forwardRef((props, ref) => (
  <MemoRefreshHeader forwardedRef={ref} {...props} />
));

ForwardRefreshHeader.displayName = 'RefreshHeader';

export default ForwardRefreshHeader;
