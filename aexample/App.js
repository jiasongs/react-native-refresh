'use strict';
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import ListView from './src/List/ListView';
import RefreshNormalHeader from './src/RefreshNormalHeader';
import RefreshAnimateHeader from './src/RefreshAnimateHeader';

const dataTemp = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

function App() {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(dataTemp);
  const listRef = useRef(React.createRef());

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <ListView
        ref={listRef}
        style={styles.container}
        onRefresh={(stopRefresh) => {
          setTimeout(() => {
            stopRefresh();
          }, 3000);
        }}
        keyExtractor={(item, index) => index + ''}
        data={data}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{ height: 100 }}
              onPress={() => {
                alert('Z');
              }}
            >
              <Text>{'Item' + index}</Text>
            </TouchableOpacity>
          );
        }}
        onEndReached={(stopEndReached) => {
          setTimeout(() => {
            setData((preData) => {
              return preData.concat([1, 1, 1, 1]);
            });
            if (data.length > 100) {
              stopEndReached({ allLoad: true });
            } else {
              stopEndReached({ allLoad: false });
            }
          }, 5000);
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
