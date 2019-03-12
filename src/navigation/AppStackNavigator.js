import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import AppBottomTabNavigator from './AppBottomTabNavigator';
import CustomDeleteTag from '../page/CustomDeleteTag';
import CustomTag from '../page/CustomTag';
import RepositoryDetail from '../page/RepositoryDetail';
import About from '../page/About';
import AboutAuthor from '../page/AboutAuthor';
import WebView from '../page/WebView';
import Search from '../page/Search';
import CustomTheme from '../page/CustomTheme';

// 总路由配置
export default createAppContainer(createStackNavigator({
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
  },
  CustomTheme: {
    screen: CustomTheme,
    navigationOptions: () => ({
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center'
      }
    })
  }
}, {
  initialRouteName: 'AppBottomTabNavigator'
}));
