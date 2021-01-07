import * as React from 'react';
import { StyleProp } from 'react-native';

type State = 'Idle' | 'Pulling' | 'Refreshing' | 'End';

interface Event {
  nativeEvent: {
    offset: number;
  };
}

export interface RefreshState {
  Idle: 'Idle' /** 普通闲置状态 */;
  Pulling: 'Pulling' /** 松开就可以进行刷新的状态 */;
  Refreshing: 'Refreshing' /** 正在刷新中的状态 */;
  End: 'End' /** 结束刷新，但还没有执行完动画 */;
}

export interface RefreshHeaderProps {
  style?: StyleProp;
}

export interface RefreshLayoutProps {
  enable?: boolean;
  refreshing?: boolean;
  onIdleRefresh?: (state: State) => void;
  onRefresh?: (state: State) => void;
  onPullingRefresh?: (state: State) => void;
  onEndRefresh?: (state: State) => void;
  onChangeOffset?: (event: Event) => void;
}

export const RefreshHeader: React.ComponentClass<RefreshHeaderProps>;

export const RefreshLayout: React.ComponentClass<RefreshLayoutProps>;

export const RefreshState: RefreshState;
