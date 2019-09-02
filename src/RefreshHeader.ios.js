'use strict';
import React, { useMemo } from 'react';
import {
  StyleSheet,
  ViewPropTypes,
  requireNativeComponent,
} from 'react-native';

function RefreshHeader(props) {
  const { children, style } = props;

  const buildStyles = useMemo(() => {
    const flattenStyle = StyleSheet.flatten(style ? style : {});
    if (!flattenStyle.height) {
      console.warn('style中必须设置固定高度');
    }
    return {
      style: flattenStyle,
    };
  }, [style]);

  return (
    <RCTRefreshHeader style={buildStyles.style}>{children}</RCTRefreshHeader>
  );
}

RefreshHeader.propTypes = {
  style: ViewPropTypes.style,
};

RefreshHeader.defaultProps = {};

const RCTRefreshHeader = requireNativeComponent('RCTRefreshHeader');

const MemoRefreshHeader = React.memo(RefreshHeader);

MemoRefreshHeader.displayName = 'RCTRefreshHeader';

export default MemoRefreshHeader;
