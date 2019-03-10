import React from 'react';
import { View, Button, TextInput, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { WebView } from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class RepositoryDetail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity
        onPress={() => navigation.state.params.goBack()}
      >
        <Feather
          style={{ margin: 11 }}
          name="arrow-left"
          size={20}
        />
      </TouchableOpacity>
    ),
    headerTitle: navigation.state.params.item.full_name,
    headerRight: (
      <TouchableOpacity
        style={{ margin: 10 }}
        onPress={() => navigation.state.params.favorite()}
      >
        <MaterialIcons
          name={navigation.state.params.isFavorite ? 'favorite' : 'favorite-border'}
          size={23}
          color={navigation.state.params.isFavorite ? '#06f' : '#999'}
        />
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      canGoBack: false,
      text: '',
      uri: ''
    };
  }

  componentDidMount = () => {
    const { props } = this;
    props.navigation.setParams({
      goBack: this.goBack,
      favorite: this.favorite
    });
  };

  favorite = async () => {
    const { props } = this;
    const item = props.navigation.state.params.item;
    // 调用路由参数中的对象方法
    props.navigation.state.params.parentObj.favorite(item);
    // 反选喜好
    props.navigation.setParams({
      isFavorite: !props.navigation.state.params.isFavorite
    });
  };

  goBack = () => {
    const { props, state } = this;
    if (state.canGoBack) {
      this.refs['webView'].goBack();
    } else {
      props.navigation.pop();
    }
  };

  render = () => {
    const { props } = this;
    return (
      <View style={{ flex: 1 }}>
        <WebView
          ref="webView"
          source={{ uri: props.navigation.state.params.item.html_url }}
          startInLoadingState={true}
          onNavigationStateChange={(navState) => {
            this.setState({
              canGoBack: navState.canGoBack
            });
          }}
        />
      </View>
    );
  };
}
