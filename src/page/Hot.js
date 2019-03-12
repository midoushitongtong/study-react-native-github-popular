import React from 'react';
import { NavigationEvents } from 'react-navigation';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  AsyncStorage,
  TouchableOpacity,
  DeviceEventEmitter
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Toast from 'react-native-easy-toast';
import HotTag from '../component/HotTag';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ViewUtil from '../util/ViewUtil';
import ThemeConnect from '../core/ThemeConnect';

export default class Hot extends ThemeConnect {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: '热门',
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center'
    },
    headerLeft: (<View/>),
    headerRight: (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={{ margin: 5 }} onPress={() => navigation.push('Search')}>
          <MaterialIcons
            size={25}
            name="search"
            color={navigation.state.params && navigation.state.params.theme}
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          {navigation.state.params && navigation.state.params.menuList
            ? (
              ViewUtil.renderMoreMenu({
                data: navigation.state.params.menuList,
                callback: (value, index) => {
                  const urlInfo = navigation.state.params.menuList[index].value;
                  navigation.push(urlInfo.page, urlInfo.params);
                },
                iconName: 'more-vertical',
                pickerStyle: {
                  width: 150
                },
                dropdownOffset: {
                  left: -110
                },
                iconStyle: {
                  color: navigation.state.params && navigation.state.params.theme
                }
              })
            )
            : null}
        </View>
      </View>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      hotTag: [],
      menuList: [
        {
          value: {
            page: 'CustomTag',
            params: {
              actionType: 'hot'
            }
          },
          name: '自定义热门标签'
        },
        {
          value: {
            page: 'CustomDeleteTag',
            params: {
              actionType: 'hot'
            }
          },
          name: '移除热门标签'
        },
        {
          value: {
            page: 'About'
          },
          name: '关于'
        }
      ]
    };
  }

  componentDidMount = async () => {
    const { props, state } = this;
    props.navigation.setParams({
      menuList: state.menuList
    });

    await this.initHotTag();

    this.listener = DeviceEventEmitter.addListener('showToast', (text) => {
      this.refs['toast'].show(text, 500);
    });
  };

  initHotTag = async () => {
    const storageRepositoryTag = await AsyncStorage.getItem('hotTag');
    this.setState({
      hotTag: storageRepositoryTag !== null
        ? JSON.parse(storageRepositoryTag)
        : require('../config/default_hot_tag')
    });
  };

  componentWillUnmount = () => {
    if (this.listener) {
      DeviceEventEmitter.removeListener(this.listener.remove());
    }
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
            state.hotTag.filter(item => item.checked === true).map((item, index) => (
              <HotTag
                ref="hotTag"
                actionType="normal"
                key={index}
                tabLabel={item.name}
                path={item.path}
                iconColor={state.theme}
                {...props}
              >{item.name}</HotTag>
            ))
          }
        </ScrollableTabView>
        <Toast ref="toast" position="bottom" positionValue={200}/>
        <NavigationEvents
          onDidFocus={async () => {
            if (this.refs['hotTag']) {
              await this.initHotTag();
              this.refs['hotTag'].searchData();
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
