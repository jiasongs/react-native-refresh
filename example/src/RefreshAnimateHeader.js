'use strict';
import React, { useRef, useCallback, useMemo } from 'react';
import { Image, StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';
import RefreshBaseHeader from './src/BaseRefreshHeader';

const State = RefreshBaseHeader.State;

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
  const currentState = useRef(State.Idle);

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
      if (currentState.current === State.Idle) {
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
    <RefreshBaseHeader
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
    </RefreshBaseHeader>
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

RefreshAnimateHeader.propTypes = {
  ...RefreshBaseHeader.propTypes,
  lotteryStyle: Image.propTypes.style,
  source: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

RefreshAnimateHeader.defaultProps = {
  ...RefreshBaseHeader.defaultProps,
};

const MemoRefreshAnimateHeader = React.memo(RefreshAnimateHeader);

const ForwardRefreshAnimateHeader = React.forwardRef((props, ref) => (
  <MemoRefreshAnimateHeader forwardedRef={ref} {...props} />
));

ForwardRefreshAnimateHeader.displayName = 'RefreshAnimateHeader';

export default ForwardRefreshAnimateHeader;
