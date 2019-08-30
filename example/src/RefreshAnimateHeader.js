'use strict';
import React, { useRef, useCallback, useMemo } from 'react';
import { StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import { BaseRefreshHeader, RefreshState } from 'react-native-refresh';

console.log('RefreshState', RefreshState);
function RefreshAnimateHeader(props) {
  const {
    style,
    refreshing,
    onPullingRefresh,
    onRefresh,
    onEndRefresh,
    onChangeOffset,
    forwardedRef,
    source,
    lotteryStyle,
  } = props;

  const lottieRef = useRef(React.createRef());
  const progressRef = useRef(new Animated.Value(1));
  const currentState = useRef(RefreshState.Idle);

  const onPullingRefreshCallBack = useCallback(
    (state) => {
      currentState.current = state;
      onPullingRefresh && onPullingRefresh(state);
    },
    [onPullingRefresh],
  );

  const onRefreshCallBack = useCallback(
    (state) => {
      currentState.current = state;
      setTimeout(() => {
        lottieRef.current.play();
      }, 0);
      onRefresh && onRefresh(state);
    },
    [onRefresh],
  );

  const onEndRefreshCallBack = useCallback(
    (state) => {
      currentState.current = state;
      onEndRefresh && onEndRefresh(state);
    },
    [onEndRefresh],
  );

  const onChangeOffsetCallBack = useCallback(
    (event) => {
      const { newOffset } = event.nativeEvent;
      if (currentState.current === RefreshState.Idle) {
        progressRef.current.setValue(Math.abs(newOffset.y));
      }
      onChangeOffset && onChangeOffset(event);
    },
    [onChangeOffset],
  );

  const buildStyles = useMemo(() => {
    return {
      style: [styles.container, style],
      lotteryStyle: [styles.lottery, lotteryStyle],
    };
  }, [lotteryStyle, style]);

  return (
    <BaseRefreshHeader
      ref={forwardedRef}
      style={buildStyles.style}
      refreshing={refreshing}
      onChangeOffset={onChangeOffsetCallBack}
      onPullingRefresh={onPullingRefreshCallBack}
      onRefresh={onRefreshCallBack}
      onEndRefresh={onEndRefreshCallBack}
    >
      <LottieView
        ref={lottieRef}
        style={buildStyles.lotteryStyle}
        resizeMode={'cover'}
        loop={true}
        autoSize={false}
        autoPlay={false}
        source={source}
        progress={progressRef.current.interpolate({
          inputRange: [0, 300],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })}
      />
    </BaseRefreshHeader>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  lottery: {
    height: '100%',
  },
});

export default React.memo(RefreshAnimateHeader);
