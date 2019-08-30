'use strict';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import { RefreshAnimateHeader, RefreshNormalHeader } from './src';
import { RefreshHeader } from 'react-native-refresh';
import Zz from './src/zz';

function App() {
  const [refreshing, setRefreshing] = useState(false);

  return (
    <FlatList
      style={styles.container}
      refreshControl={
        <Zz
          refreshing={refreshing}
          // source={require('./src/assets/lectureLoading.json')}
          onRefresh={() => {
            setRefreshing(true);
          }}
        />
      }
      onScroll={() => {
        console.log('111');
      }}
      keyExtractor={(item, index) => index + ''}
      data={[1, 1, 1, 1, 1, 1, 1]}
      renderItem={() => {
        return (
          <View>
            <Text>Item</Text>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'green',
  },
});

export default React.memo(App);
