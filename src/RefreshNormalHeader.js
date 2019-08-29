'use strict';
import React, { useRef, useState, useCallback, useMemo } from 'react';
import {
  View,
  Animated,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import RefreshBaseHeader from './RefreshBaseHeader';

function NormalRefreshHeader(props) {
  const {
    style,
    refreshing,
    onPullingRefresh,
    onRefresh,
    onEndRefresh,
    onChangeOffset,
  } = props;

  const [title, setTitle] = useState('下拉刷新');
  const rotateZRef = useRef(new Animated.Value(0));

  const onPullingRefreshCallBack = useCallback(
    (state) => {
      onPullingRefresh && onPullingRefresh(state);
      Animated.timing(rotateZRef.current, {
        toValue: -180,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {});
      setTitle('松开即可刷新');
    },
    [onPullingRefresh],
  );

  const onRefreshCallBack = useCallback(
    (state) => {
      onRefresh && onRefresh(state);
      setTitle('正在刷新');
    },
    [onRefresh],
  );

  const onEndRefreshCallBack = useCallback(
    (state) => {
      onEndRefresh && onEndRefresh(state);
      Animated.timing(rotateZRef.current, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {});
      setTitle('下拉刷新');
    },
    [onEndRefresh],
  );

  const buildStyles = useMemo(() => {
    return {
      style: [styles.container, style],
    };
  }, [style]);

  return (
    <RefreshBaseHeader
      style={buildStyles.style}
      refreshing={refreshing}
      onChangeOffset={onChangeOffset}
      onPullingRefresh={onPullingRefreshCallBack}
      onRefresh={onRefreshCallBack}
      onEndRefresh={onEndRefreshCallBack}
    >
      <View style={styles.leftContainer}>
        {refreshing ? (
          <ActivityIndicator
            animating={refreshing}
            size='small'
            hidesWhenStopped={true}
            color={'#666'}
          />
        ) : (
          <Animated.Image
            style={[
              styles.image,
              {
                transform: [
                  {
                    rotate: rotateZRef.current.interpolate({
                      inputRange: [0, 180],
                      outputRange: ['0deg', '180deg'],
                    }),
                  },
                ],
              },
            ]}
            source={require('../../../assets/icon/icon_down_arrow.png')}
          />
        )}
      </View>
      <Text style={styles.titleStyle}>{title}</Text>
    </RefreshBaseHeader>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  titleStyle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginLeft: 10,
  },
  leftContainer: {
    width: 30,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

NormalRefreshHeader.propTypes = {
  ...RefreshBaseHeader.type.propTypes,
};

NormalRefreshHeader.defaultProps = {
  ...RefreshBaseHeader.type.defaultProps,
};

export default React.memo(NormalRefreshHeader);
