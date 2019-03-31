import React from 'react';
import { NavigationEvents } from 'react-navigation';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  DeviceEventEmitter,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Toast from 'react-native-easy-toast';
import TrendingTag from '../component/TrendingTag';
import ViewUtil from '../util/ViewUtil';
import ThemeConnect from '../core/ThemeConnect';
import MenuDialog from "../component/MenuDialog";

export default class Trending extends ThemeConnect {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold', textAlign: 'center' }}>趋势</Text>
      </View>
    ),
    headerLeft: (
      <View/>
    ),
    headerRight: (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        {navigation.state.params && navigation.state.params.sinceList
          ? (
            <MenuDialog
              iconName="trending-down"
              iconColor={navigation.state.params.theme}
              menuList={navigation.state.params.sinceList}
              callback={(index) => {
                navigation.state.params.changeSince(navigation.state.params.sinceList[index].value);
              }}
            />
          )
          : null}
        <View style={{ flex: 1 }}>
          {navigation.state.params && navigation.state.params.menuList
            ? (
              <MenuDialog
                iconName='more-vertical'
                iconColor={navigation.state.params.theme}
                menuList={navigation.state.params.menuList}
                callback={(index) => {
                  const urlInfo = navigation.state.params.menuList[index].value;
                  navigation.push(urlInfo.page, urlInfo.params);
                }}
              />
            )
            : null}
        </View>
      </View>
    ),
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center'
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      menuList: [
        {
          value: {
            page: 'CustomTag',
            params: {
              actionType: 'trending'
            }
          },
          name: '自定义趋势标签'
        },
        {
          value: {
            page: 'CustomDeleteTag',
            params: {
              actionType: 'trending'
            }
          },
          name: '移除趋势标签'
        },
        {
          value: {
            page: 'About'
          },
          name: '关于'
        }
      ],
      trendingTag: [],
      sinceList: [
        { value: 'daily', name: '今天' },
        { value: 'weekly', name: '一星期内' },
        { value: 'monthly', name: '一个月内' }
      ],
      since: 'daily'
    };
  }

  componentDidMount = async () => {
    const { props, state } = this;
    props.navigation.setParams({
      menuList: state.menuList,
      sinceList: state.sinceList,
      changeSince: this.changeSince
    });

    await this.initTrendingTag();

    this.listener = DeviceEventEmitter.addListener('showToast', (text) => {
      this.refs['toast'].show(text, 500);
    });
  };

  componentWillUnmount = () => {
    this.listener && DeviceEventEmitter.removeListener(this.listener.remove());
  };

  initTrendingTag = async () => {
    const storageRepositoryTag = await AsyncStorage.getItem('trendingTag');
    this.setState({
      trendingTag: storageRepositoryTag !== null
        ? JSON.parse(storageRepositoryTag)
        : require('../config/default_hot_tag')
    });
  };

  // 改变日期排序, 刷新数据
  changeSince = (since) => {
    this.setState({
      since
    });
    this.refs['trendingTag'].searchData();
  };

  render = () => {
    const { props, state } = this;
    return (
      <View style={styles.container}>
        <ScrollableTabView
          tabBarBackgroundColor={state.theme}
          tabBarInactiveTextColor="#fff"
          tabBarActiveTextColor="#fff"
          tabBarUnderlineStyle={{ backgroundColor: '#f9f9ff' }}
          renderTabBar={() => <ScrollableTabView.ScrollableTabBar/>}
        >
          {
            state.trendingTag.filter(item => item.checked === true).map((item, index) => (
              <TrendingTag
                actionType="normal"
                ref="trendingTag"
                key={index}
                tabLabel={item.name}
                path={item.path}
                since={state.since}
                iconColor={state.theme}
                {...props}
              >{item.name}</TrendingTag>
            ))
          }
        </ScrollableTabView>
        <Toast ref="toast" position="bottom" positionValue={200}/>
        <NavigationEvents
          onDidFocus={async () => {
            if (this.refs['trendingTag']) {
              await this.initTrendingTag();
              this.refs['trendingTag'].searchData();
            }
          }}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3'
  }
});
