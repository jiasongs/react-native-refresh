import * as React from 'react';
import { StyleProp } from 'react-native';

type State = 'Idle' | 'Pulling' | 'Refreshing';

interface Event {
  nativeEvent: {
    offset: number;
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

export const RefreshHeader: React.ComponentClass<RefreshHeaderProps>;

export const RefreshState: RefreshState;
