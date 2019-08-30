'use strict';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { RefreshAnimateHeader, RefreshNormalHeader } from './src';

function App() {
  const [refreshing, setRefreshing] = useState(false);

  return (
    <FlatList
      style={styles.container}
      refreshControl={
        <RefreshNormalHeader
          refreshing={refreshing}
          source={require('./src/assets/lectureLoading.json')}
          onRefresh={() => {
            setRefreshing(true);
            setTimeout(() => {
              setRefreshing(false);
            }, 2000);
          }}
        />
      }
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
  },
});

export default React.memo(App);
