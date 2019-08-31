'use strict';
import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Animated,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import Dayjs from 'dayjs';
import { RefreshHeader } from 'react-native-refresh';

function NormalRefreshHeader(props) {
  const { refreshing, onRefresh } = props;

  const [title, setTitle] = useState('下拉刷新');
  const [lastTime, setLastTime] = useState(Dayjs().format('HH:mm'));
  const rotateZRef = useRef(new Animated.Value(0));

  const onPullingRefreshCallBack = useCallback((state) => {
    Animated.timing(rotateZRef.current, {
      toValue: -180,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {});
    setTitle('松开立即刷新');
  }, []);

  const onRefreshCallBack = useCallback(
    (state) => {
      onRefresh && onRefresh(state);
      setLastTime(Dayjs().format('HH:mm'));
      setTitle('正在刷新...');
    },
    [onRefresh],
  );

  const onEndRefreshCallBack = useCallback((state) => {
    Animated.timing(rotateZRef.current, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {});
    setTitle('下拉刷新');
  }, []);

  console.log('refreshing', refreshing);
  return (
    <RefreshHeader
      style={styles.container}
      refreshing={refreshing}
      onPullingRefresh={onPullingRefreshCallBack}
      onRefresh={onRefreshCallBack}
      onEndRefresh={onEndRefreshCallBack}
    >
      <View style={styles.leftContainer}>
        <Animated.Image
          style={[
            styles.image,
            {
              opacity: refreshing ? 0 : 1,
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
          source={require('./assets/icon_down_arrow.png')}
        />
        <ActivityIndicator
          style={{ opacity: refreshing ? 1 : 0 }}
          animating={true}
          size="small"
          hidesWhenStopped={true}
        />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.titleStyle}>{title}</Text>
        <Text style={styles.timeStyle}>{`最后更新：${lastTime}`}</Text>
      </View>
      {props.children}
    </RefreshHeader>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 16,
    color: '#333',
  },
  timeStyle: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  leftContainer: {
    width: 30,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rightContainer: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default React.memo(NormalRefreshHeader);
