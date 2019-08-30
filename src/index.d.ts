import * as React from 'react';
import { StyleProp } from 'react-native';

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

export interface RefreshState {
  Idle: 'Idle';
  Pulling: 'Pulling';
  Refreshing: 'Refreshing';
}

export interface RefreshHeaderProps {
  style?: StyleProp;

  refreshing: boolean;

  onRefresh(state: State): void;

  onPullingRefresh?(state: State): void;

  onEndRefresh?(state: State): void;

  onChangeOffset?(event: Event): void;
}

export const BaseRefreshHeader: React.ComponentClass<RefreshHeaderProps>;

export const RefreshState: Object<RefreshState>;
