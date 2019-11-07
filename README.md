# react-native-refresh
原生集成的下拉刷新。

# 原理
此库iOS基于MJRefresh，安卓基于SmartRefreshLayout，均是原生中使用非常广泛的下拉刷新库。
此库只提供基础的Base部分，但是Demo中提供了两种此库的用法，一个是默认的文字形式，一个是结合lottie实现的下拉刷新动画。

# 注意！！！
- 支持0.59+，使用Android X的开发者在项目根目录执行 `npx jetify`。
- 0.57以下，因为RN iOS平台的ScrollView添加RefreshControl的方式还未改变，不支持自定义，需要改动ScrollView源码才能实现，故不会适配。
- 如果使用上遇到问题或者疑惑，请提交issue，比较着急的话请加我QQ：593908937。

## 下载 
### React Native >= 0.60.0

```
$ npm install react-native-refresh --save
$ cd ios && pod install
$ cd .. && npx jetify 
$ npm run ios // npm run android

```

### React Native >= 0.59

```
$ npm install react-native-refresh --save
$ react-native link react-native-refresh
$ npm run ios // npm run android

```



