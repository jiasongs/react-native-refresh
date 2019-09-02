'use strict';
import React from 'react';
import { RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import RefreshAnimateHeader from '../RefreshAnimateHeader';
import RefreshNormalHeader from '../RefreshNormalHeader';

function ListHeaderLoading(props) {
  const { isRefreshing, onRefresh, ...others } = props;

  return (
    <RefreshAnimateHeader
      refreshing={isRefreshing}
      source={require('../assets/8572-liquid-blobby-loader.json')}
      onRefresh={onRefresh}
      {...others}
    />
  );
}

ListHeaderLoading.propTypes = {
  isRefreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
  colors: PropTypes.array,
  progressBackgroundColor: PropTypes.string,
  size: PropTypes.any,
  tintColor: PropTypes.string,
  title: PropTypes.string,
  progressViewOffset: PropTypes.number,
};

ListHeaderLoading.defaultProps = {
  isRefreshing: false,
};

export default React.memo(ListHeaderLoading);
