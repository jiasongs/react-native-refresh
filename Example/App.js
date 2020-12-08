'use strict';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
// eslint-disable-next-line no-unused-vars
import RefreshNormalHeader from './src/RefreshNormalHeader';
import RefreshAnimateHeader from './src/RefreshAnimateHeader';

const dataTemp = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

function App() {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(dataTemp);

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <FlatList
        style={styles.container}
        refreshControl={
          <RefreshAnimateHeader
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setTimeout(() => {
                setRefreshing(false);
              }, 3000);
            }}
          />
        }
        keyExtractor={(item, index) => index + ''}
        data={data}
        renderItem={({ index }) => {
          return (
            <TouchableOpacity
              style={{ height: 100 }}
              onPress={() => {
                alert('点击');
              }}
            >
              <Text>{'Item' + index}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

export default React.memo(App);
