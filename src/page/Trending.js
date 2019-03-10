import React from 'react';
import { NavigationEvents } from 'react-navigation';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  AsyncStorage,
  DeviceEventEmitter,
  TouchableOpacity
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Toast from 'react-native-easy-toast';
import Feather from 'react-native-vector-icons/Feather';
import { Dropdown } from 'react-native-material-dropdown';
import TrendingTag from '../component/TrendingTag';

export default class Trending extends React.Component {
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
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ margin: 10 }}
        >
          {navigation.state.params && navigation.state.params.sinceList
            ? (
              <Dropdown
                data={navigation.state.params.sinceList}
                pickerStyle={{ width: 100 }}
                dropdownOffset={{ top: 50, left: -60 }}
                renderBase={() => (
                  <Feather
                    size={20}
                    name="more-vertical"
                    color="#000"
                  />
                )}
                valueExtractor={(item) => item.name}
                onChangeText={(value, index) => navigation.state.params.changeSince(navigation.state.params.sinceList[index].value)}
              />
            )
            : null}
        </TouchableOpacity>
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
      trendingTag: [],
      sinceList: [
        { value: 'daily', name: '今天' },
        { value: 'weekly', name: '一星期' },
        { value: 'monthly', name: '一个月' }
      ],
      since: 'daily'
    };
  }

  componentDidMount = async () => {
    const { props, state } = this;
    props.navigation.setParams({
      sinceList: state.sinceList,
      changeSince: this.changeSince
    });
    const storageTrendingTag = await AsyncStorage.getItem('trendingTag');
    this.setState({
      trendingTag: storageTrendingTag !== null
        ? JSON.parse(storageTrendingTag)
        : require('../config/default_trending_tag')
    });

    this.listener = DeviceEventEmitter.addListener('showToast', (text) => {
      this.refs['toast'].show(text, 500);
    });
  };

  componentWillUnmount = () => {
    this.listener && DeviceEventEmitter.removeListener(this.listener.remove());
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
          tabBarBackgroundColor="#06f"
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
                {...props}
              >{item.name}</TrendingTag>
            ))
          }
        </ScrollableTabView>
        <Toast ref="toast" position="bottom" positionValue={200}/>
        <NavigationEvents
          onDidFocus={() => {
            if (this.refs['trendingTag']){
              this.refs['trendingTag'].searchData()
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
