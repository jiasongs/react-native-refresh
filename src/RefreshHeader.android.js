'use strict';
import React, { useRef, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  ViewPropTypes,
  requireNativeComponent,
  View,
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
        if (state === 1) {
          onIdleRefresh && onIdleRefresh(State.Idle);
        } else if (state === 2) {
          onPullingRefresh && onPullingRefresh(State.Pulling);
        } else if (state === 3) {
          onRefresh && onRefresh(State.Refreshing);
        } else if (state === 4) {
          onEndRefresh && onEndRefresh(State.End);
        }
        console.log('state', state);
        currentState.current = state;
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
      ref={forwardedRef}
      style={styles.positionStyle}
      refreshing={refreshing}
      onChangeOffset={onChangeOffset}
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
