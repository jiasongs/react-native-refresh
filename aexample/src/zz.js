'use strict';
import React, { useRef, useState, useCallback, useMemo } from 'react';
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

  return (
    <RCTRefreshHeader style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Text>134</Text>
      {children}
    </RCTRefreshHeader>
  );
}

const RCTRefreshHeader = requireNativeComponent('RCTRefreshHeader');

export default Test;
