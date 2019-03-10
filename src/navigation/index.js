import React from 'react';
import { View, TouchableOpacity, Text, DeviceEventEmitter } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Hot from '../page/Hot';
import Trending from '../page/Trending';
import My from '../page/My';
import CustomDeleteTag from '../page/CustomDeleteTag';
import CustomTag from '../page/CustomTag';
import RepositoryDetail from '../page/RepositoryDetail';
import Favorite from '../page/Favorite';
import About from '../page/About';
import AboutAuthor from '../page/AboutAuthor';
import WebView from '../page/WebView';
import Search from '../page/Search';

// 底部导航配置
export const AppBottomTabNavigator = createBottomTabNavigator({
  Hot: {
    screen: createStackNavigator({
      screen: Hot
    }),
    navigationOptions: () => ({
      tabBarLabel: '热门',
      tabBarIcon: ({ tintColor, focused }) => (
        <FontAwesome5
          size={20}
          name="hotjar"
          style={{ color: tintColor }}
        />
      )
    })
  },
  Trending: {
    screen: createStackNavigator({
      screen: Trending
    }),
    navigationOptions: () => ({
      tabBarLabel: '趋势',
      tabBarIcon: ({ tintColor, focused }) => (
        <Feather
          size={20}
          name="trending-up"
          style={{ color: tintColor }}
        />
      )
    })
  },
  Favorite: {
    screen: createStackNavigator({
      screen: Favorite
    }),
    navigationOptions: () => ({
      tabBarLabel: '收藏',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name={'favorite'}
          size={23}
          style={{ color: tintColor }}
        />
      )
    })
  },
  My: {
    screen: createStackNavigator({
      screen: My
    }),
    navigationOptions: () => ({
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          size={25}
          name="person-outline"
          style={{ color: tintColor }}
        />
      )
    })
  }
}, {
  initialRouteName: 'Hot',
  inactiveColor: '#999',
  activeColor: '#06f',
  barStyle: {
    backgroundColor: '#f3f3f3'
  }
});

// 总路由配置
export const AppStackNavigator = createStackNavigator({
  AppBottomTabNavigator: {
    screen: AppBottomTabNavigator,
    navigationOptions: () => ({
      header: null
    })
  },
  CustomTag: {
    screen: CustomTag,
    navigationOptions: () => ({
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center'
      }
    })
  },
  CustomDeleteTag: {
    screen: CustomDeleteTag,
    navigationOptions: () => ({
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center'
      }
    })
  },
  RepositoryDetail: {
    screen: RepositoryDetail,
    navigationOptions: () => ({
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center'
      }
    })
  },
  About: {
    screen: About,
    navigationOptions: () => ({
      header: null
    })
  },
  AboutAuthor: {
    screen: AboutAuthor,
    navigationOptions: () => ({
      header: null
    })
  },
  WebView: {
    screen: WebView,
    navigationOptions: () => ({
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center'
      }
    })
  },
  Search: {
    screen: Search,
    navigationOptions: () => ({
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center'
      }
    })
  }
}, {
  initialRouteName: 'AppBottomTabNavigator'
});
