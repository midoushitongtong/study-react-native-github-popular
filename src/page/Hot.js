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

export default class Hot extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: '热门',
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center'
    },
    headerLeft: (<View/>),
    headerRight: (
      <TouchableOpacity style={{ margin: 5 }} onPress={() => navigation.push('Search')}>
        <MaterialIcons
          size={25}
          name="search"
          color="#06f"
        />
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      HotTag: []
    };
  }

  componentDidMount = async () => {
    const { props } = this;
    props.navigation.setParams({
      tabBarCallBack: this.initData
    });

    await this.initHotTag();

    this.listener = DeviceEventEmitter.addListener('showToast', (text) => {
      this.refs['toast'].show(text, 500);
    });
  };

  initHotTag = async () => {
    const storageRepositoryTag = await AsyncStorage.getItem('hotTag');
    this.setState({
      HotTag: storageRepositoryTag !== null
        ? JSON.parse(storageRepositoryTag)
        : require('../config/default_hot_tag')
    });
  };

  componentWillUnmount = () => {
    this.listener && DeviceEventEmitter.removeListener(this.listener.remove());
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
            state.HotTag.filter(item => item.checked === true).map((item, index) => (
              <HotTag
                ref="hotTag"
                actionType="normal"
                key={index}
                tabLabel={item.name}
                path={item.path}
                {...props}
              >{item.name}</HotTag>
            ))
          }
        </ScrollableTabView>
        <Toast ref="toast" position="bottom" positionValue={200}/>
        <NavigationEvents
          onDidFocus={() => {
            if (this.refs['hotTag']) {
              this.refs['hotTag'].searchData();
              this.initHotTag();
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
