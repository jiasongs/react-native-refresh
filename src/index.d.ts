import * as React from 'react';
import { StyleProp, AccessibilityProps } from 'react-native';

type State = 'Idle' | 'Pulling' | 'Refreshing';

type Point = {
  x: number;
  y: number;
};

interface Event {
  nativeEvent: {
    newOffset: Point;
    oldOffset: Point;
  };
}

interface RefreshState {
  Idle: 'Idle';
  Pulling: 'Pulling';
  Refreshing: 'Refreshing';
}

export interface RefreshHeaderProperties {
  style?: StyleProp;

  refreshing: boolean;

  onRefresh(state: State): void;

  onPullingRefresh?(state: State): void;

  onEndRefresh?(state: State): void;

  onChangeOffset?(event: Event): void;
}

export const RefreshBaseHeader: React.ComponentClass<RefreshHeaderProperties>;

export const RefreshNormalHeader: React.ComponentClass<RefreshHeaderProperties>;

export const RefreshState: RefreshState;
