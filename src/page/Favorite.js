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
import HotTag from '../component/HotTag';
import TrendingTag from '../component/TrendingTag';

export default class Favorite extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold', textAlign: 'center' }}>收藏</Text>
      </View>
    ),
    headerLeft: (
      <View/>
    ),
    headerRight: (
      <View/>
    ),
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center'
    }
  });

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {

  };

  render = () => {
    const { props } = this;
    return (
      <View style={styles.container}>
        <ScrollableTabView
          tabBarInactiveTextColor="#fff"
          tabBarActiveTextColor="#fff"
          tabBarBackgroundColor="#06f"
          tabBarUnderlineStyle={{ backgroundColor: '#f9f9ff' }}
          renderTabBar={() => <ScrollableTabView.ScrollableTabBar/>}
        >
          <HotTag
            ref="hotTag"
            tabLabel="hot"
            actionType="favorite"
            {...props}
          />
          <TrendingTag
            ref="trendingTag"
            tabLabel="trending"
            actionType="favorite"
            {...props}
          />
        </ScrollableTabView>
        <NavigationEvents
          onDidFocus={() => {
            if (this.refs['hotTag']) {
              this.refs['hotTag'].searchData();
            }
            if (this.refs['trendingTag']) {
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
