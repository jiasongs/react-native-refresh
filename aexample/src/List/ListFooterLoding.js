'use strict';
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

function RenderIndicator(props) {
  const { loading } = props;
  return (
    <View style={styles.indicatorContainer}>
      <ActivityIndicator
        animating={loading}
        size="small"
        hidesWhenStopped={true}
        color={'#666'}
      />
      <Text style={styles.footerText}>正在加载...</Text>
    </View>
  );
}

function RenderAllLoad() {
  return (
    <View style={styles.indicatorContainer}>
      <Text style={styles.footerText}>数据已全部加载完毕</Text>
    </View>
  );
}

function ListFooterLoding(props) {
  const { loading, allLoad } = props;

  if (!loading && allLoad) {
    return <RenderAllLoad />;
  } else if (loading) {
    return <RenderIndicator loading={loading} />;
  }
  return null;
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  footerText: {
    marginLeft: 10,
    height: 30,
    lineHeight: 30,
    fontSize: 13,
    color: '#999999',
  },
});

ListFooterLoding.propTypes = {
  loading: PropTypes.bool,
  allLoad: PropTypes.bool, // 是否加载完毕
};

ListFooterLoding.defaultProps = {
  loading: false,
  allLoad: false,
};

export default React.memo(ListFooterLoding);
