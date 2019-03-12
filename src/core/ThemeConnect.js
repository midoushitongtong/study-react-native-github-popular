import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import ThemeUtil from '../util/ThemeUtil';

export default class ThemeConnect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: null
    };

    this.initThemeState();
  }

  initThemeState = async () => {
    const { props } = this;
    const theme = await ThemeUtil.getTheme();
    this.setState({
      theme
    });

    props.navigation.setParams({
      theme
    });

    this.changeThemeListener = DeviceEventEmitter.addListener('changeTheme', (theme) => {
      this.setState({
        theme: theme
      });

      props.navigation.setParams({
        theme
      });
    });
  };

  componentWillUnmount = () => {
    if (this.changeThemeListener) {
      this.changeThemeListener.remove();
    }
  };
}
