import React from 'react';
import {
  Dimensions,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Parallax from '../component/Parallax';
import ViewUtil from '../util/ViewUtil';
import ThemeConnect from '../core/ThemeConnect';

export default class About extends ThemeConnect {
  render = () => {
    const { props, state } = this;
    return (
      <Parallax
        navigation={props.navigation}
        backgroundConfig={{
          imageURI: 'https://project.yyccyy.com/question/public/frontend/images/question_background.jpg'
        }}
        foregroundConfig={{
          imageURI: 'https://yyccyy.com/manifest/images/icons/icon-256x256.jpg',
          title: 'GitHub Popular',
          subTitle: '这是一个用来查看GitHub最受欢迎与最热门项目的App，它基于React Native支持Android和IOS双平台'
        }}
        stickyHeaderConfig={{
          title: 'Github Popular'
        }}
        content={(
          <View>
            {ViewUtil.renderListItem({
              callback: () => props.navigation.push('AboutAuthor'),
              text: '关于作者',
              leftIconName: 'person',
              leftIconStyle: { color: state.theme },
              rightIconName: 'chevron-right',
              rightIconStyle: { color: state.theme }
            })}
          </View>
        )}
      />
    );
  };
}
