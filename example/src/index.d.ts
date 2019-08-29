import * as React from 'react';
import { StyleProp } from 'react-native';

export type interface RefreshHeaderProperties {
  style: StyleProp;

  refreshing?: boolean;

  onRefresh?(): void;

  onPullingRefresh?(): void;

  onEndRefresh?(): void;

  onChangeOffset?(): void;
}

export class RefreshBaseHeader extends React.ComponentClass<
  RefreshHeaderProperties
> {}

export class RefreshNormalHeader extends React.ComponentClass<
  RefreshHeaderProperties
> {}
