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
  Linking,
  Clipboard
} from 'react-native';
import Parallax from '../component/Parallax';
import ViewUtil from '../util/ViewUtil';
import Toast from 'react-native-easy-toast';
import ThemeConnect from '../core/ThemeConnect';

export default class AboutAuthor extends ThemeConnect {
  constructor(props) {
    super(props);
    this.state = {
      menuList: [
        {
          icon: 'person',
          name: '技术博客',
          showChildMenuList: false,
          childMenuList: [
            {
              name: '个人博客',
              rightIconName: 'open-in-new',
              callback: () => {
                props.navigation.push('WebView', {
                  url: 'http://yyccyy.com'
                });
              }
            },
            {
              name: '知乎',
              rightIconName: 'open-in-new',
              callback: () => {
                props.navigation.push('WebView', {
                  url: 'http://zhihu.com/midoushitongtong'
                });
              }
            }
          ]
        },
        {
          icon: 'message',
          name: '联系方式',
          showChildMenuList: false,
          childMenuList: [
            {
              name: 'QQ: 1092879991',
              callback: () => {
                Clipboard.setString('1092879991');
                this.refs['toast'].show('以复制到剪切板', 2000);
              }
            },
            {
              name: 'Mail: 1092879991@qq.com',
              callback: () => {
                Clipboard.setString('1092879991@qq.com');
                this.refs['toast'].show('以复制到剪切板', 2000);
              }
            }
          ]
        }
      ]
    };
  }

  render = () => {
    const { props, state } = this;
    return (
      <Parallax
        navigation={props.navigation}
        backgroundConfig={{
          imageURI: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552115562020&di=85b1660df3176c6a2965fe26e366dc32&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201503%2F14%2F121145ng3d6j53bndp3buj.jpg'
        }}
        foregroundConfig={{
          imageURI: 'https://yyccyy.com/manifest/images/icons/icon-256x256.jpg',
          title: 'MiDouShiTongTong',
          subTitle: '前端切图仔'
        }}
        stickyHeaderConfig={{
          title: 'MiDouShiTongTong'
        }}
        content={(
          <View>
            {state.menuList.map((item, index) => {
              return (
                <View key={index}>
                  {ViewUtil.renderListItem({
                    callback: () => {
                      state.menuList[index].showChildMenuList = !state.menuList[index].showChildMenuList;
                      this.setState({
                        menuList: state.menuList
                      });
                    },
                    text: item.name,
                    leftIconName: item.icon,
                    leftIconStyle: { color: state.theme },
                    rightIconName: item.showChildMenuList ? 'keyboard-arrow-up' : 'keyboard-arrow-down',
                    rightIconStyle: { color: state.theme }
                  })}
                  {item.showChildMenuList ?
                    item.childMenuList.map((itemChild, indexChild) => {
                      return (
                        <View key={indexChild}>
                          {ViewUtil.renderListItem({
                              callback: itemChild.callback,
                              text: itemChild.name,
                              leftIconName: itemChild.leftIconName,
                              leftIconStyle: { color: state.theme },
                              rightIconName: itemChild.rightIconName,
                              containerStyle: {
                                paddingLeft: 73
                              },
                              rightIconStyle: {
                                fontSize: 19, marginRight: 3, color: state.theme
                              }
                            }
                          )}
                        </View>
                      );
                    })
                    : null}
                </View>
              );
            })}
            <Toast ref="toast" position="top" positionValue={111}/>
          </View>
        )}
      />
    );
  };
}
