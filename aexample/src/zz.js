'use strict';
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import {
  View,
  Animated,
  ActivityIndicator,
  Text,
  StyleSheet,
  Platform,
  RefreshControl,
  requireNativeComponent,
} from 'react-native';
import Dayjs from 'dayjs';
import { RefreshHeader } from 'react-native-refresh';

function Test(props) {
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

  const onChangeState = useCallback((event) => {}, [
    onEndRefresh,
    onPullingRefresh,
    onRefresh,
  ]);

  const buildStyles = useMemo(() => {
    return {};
  }, [style]);

  const [state, setState] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setState(true);
    }, 3000);
    return () => {};
  }, []);

  console.log('children', children);
  return (
    <RCTRefreshHeader style={{ backgroundColor: 'transparent' }}>
      {!state && <Text>222</Text>}
      <Text>111</Text>
      <Text>890</Text>
      {children}
    </RCTRefreshHeader>
  );
}

const RCTRefreshHeader = requireNativeComponent('RCTRefreshHeader');

export default Test;
