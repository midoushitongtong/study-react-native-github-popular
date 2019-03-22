import React from 'react';
import {
  BackAndroid
} from 'react-native';

export default class BackPress extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidmount = () => {
    if (this.props.backPress) {
      BackAndroid.addEventListener('hardwareBackPress', this.handlerBackPress)
    }
  };

  componentWillUnmount = () => {
    if (this.props.backPress) {
      BackAndroid.removeEventListener('hardwareBackPress', this.handlerBackPress)
    }
  };

  handlerBackPress = (e) => {
    return this.props.backPress(e);
  };
}
