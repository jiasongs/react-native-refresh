'use strict';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { RefreshNormalHeader } from './src';

function App() {
  const [refreshing, setRefreshing] = useState(false);

  return (
    <FlatList
      style={styles.container}
      refreshControl={
        <RefreshNormalHeader
          refreshing={refreshing}
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
    marginTop: 20,
  },
});

export default React.memo(App);
