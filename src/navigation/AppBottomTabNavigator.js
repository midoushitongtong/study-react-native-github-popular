import React from 'react';
import { BottomTabBar, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Hot from '../page/Hot';
import Trending from '../page/Trending';
import My from '../page/My';
import Favorite from '../page/Favorite';
import ThemeConnect from '../core/ThemeConnect';

/**
 * 单独封装 BottomTabBar 组件
 * 主要用于主题切换，能够改变颜色
 *
 */
class TabBarComponentForThemeConnect extends ThemeConnect {
  render = () => {
    return <BottomTabBar {...this.props} activeTintColor={this.state.theme}/>;
  };
}

export default createBottomTabNavigator({
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
  tabBarComponent: (props) => <TabBarComponentForThemeConnect {...props}/>,
  tabBarOptions: {
    activeTintColor: '#0fadff'
  }
});
