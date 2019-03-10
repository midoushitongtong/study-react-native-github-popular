import React from 'react';
import { View, Button, TextInput, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { WebView } from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';

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
    headerTitle: navigation.state.params.title,
    headerRight: (
      <View/>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      canGoBack: false
    };
  }

  componentDidMount = () => {
    const { props } = this;
    props.navigation.setParams({
      goBack: this.goBack
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
          source={{ uri: props.navigation.state.params.url }}
          startInLoadingState={true}
          onNavigationStateChange={(navState) => {
            this.setState({
              canGoBack: navState.canGoBack
            });
            props.navigation.setParams({
              title: navState.title
            });
          }}
        />
      </View>
    );
  };
}
