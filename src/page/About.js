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

export default class About extends React.Component {
  render = () => {
    const { props } = this;
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
            {ViewUtil.renderListItem(
              () => props.navigation.push('AboutAuthor'),
              'person',
              '关于作者',
              'chevron-right'
            )}
          </View>
        )}
      />
    );
  };
}
