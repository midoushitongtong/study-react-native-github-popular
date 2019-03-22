import React from 'react';
import { View, Button, ScrollView, TouchableHighlight, StyleSheet, Text, DeviceEventEmitter } from 'react-native';
import CustomTheme from './CustomTheme';
import ViewUtil from '../util/ViewUtil';
import ThemeConnect from '../core/ThemeConnect';
import codePush from 'react-native-code-push';

export default class My extends ThemeConnect {
  static navigationOptions = () => ({
    headerTitle: '我的',
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center'
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      customThemeVisible: false,
      menuList: {
        customHotTag: '自定义热门仓库标签',
        customTrendingTag: '自定义趋势仓库标签'
      }
    };
  }

  /**
   * 处理设置菜单项点击事件
   * 根据参数进行跳转
   *
   */
  handlerSettingItemClick = (path, params) => {
    const { props } = this;
    props.navigation.push(path, params);
  };

  handlerCheckUpdate = () => {
    codePush.sync({
      updateDialog: {
        appendReleaseDescription: true,
        descriptionPrefix: '更新内容',
        title: '更新',
        optionalUpdateMessage: '有新的更新可用',
        optionalInstallButtonLabel: '更新',
        optionalIgnoreButtonLabel: '取消'
      },
      installMode: codePush.InstallMode.IMMEDIATE
    });
  };

  render = () => {
    const { props, state } = this;
    return (
      state.theme
        ? (
          <View style={styles.container}>
            <ScrollView>
              {ViewUtil.renderListItem({
                callback: () => this.handlerSettingItemClick('About'),
                text: 'GitHub Popular',
                leftIconName: 'code',
                rightIconName: 'chevron-right',
                containerStyle: { paddingVertical: 35 },
                leftTextStyle: { fontSize: 15 },
                leftIconStyle: { fontSize: 50, color: state.theme },
                rightIconStyle: { color: state.theme }
              })}

              {/* popular */}
              <Text style={styles.menuTitle}>热门管理</Text>
              {ViewUtil.renderListItem({
                callback: () => this.handlerSettingItemClick('CustomTag', { actionType: 'hot' }),
                text: '自定义热门标签',
                leftIconName: 'list',
                rightIconName: 'chevron-right',
                leftIconStyle: { color: state.theme },
                rightIconStyle: { color: state.theme }
              })}
              {ViewUtil.renderListItem({
                callback: () => this.handlerSettingItemClick('CustomDeleteTag', { actionType: 'hot' }),
                text: '移除热门标签',
                leftIconName: 'delete',
                rightIconName: 'chevron-right',
                leftIconStyle: { color: state.theme },
                rightIconStyle: { color: state.theme }
              })}

              {/* trending */}
              <Text style={styles.menuTitle}>趋势管理</Text>
              {ViewUtil.renderListItem({
                callback: () => this.handlerSettingItemClick('CustomTag', { actionType: 'trending' }),
                text: '自定义趋势标签',
                leftIconName: 'list',
                rightIconName: 'chevron-right',
                leftIconStyle: { color: state.theme },
                rightIconStyle: { color: state.theme }
              })}
              {ViewUtil.renderListItem({
                callback: () => this.handlerSettingItemClick('CustomDeleteTag', { actionType: 'trending' }),
                text: '移除趋势标签',
                leftIconName: 'delete',
                rightIconName: 'chevron-right',
                leftIconStyle: { color: state.theme },
                rightIconStyle: { color: state.theme }
              })}

              {/* setting */}
              <Text style={styles.menuTitle}>设置</Text>
              {ViewUtil.renderListItem({
                callback: () => {
                  this.setState({
                    customThemeVisible: true
                  });
                },
                text: '自定义主题',
                leftIconName: 'color-lens',
                rightIconName: 'chevron-right',
                leftIconStyle: { color: state.theme },
                rightIconStyle: { color: state.theme }
              })}
              {ViewUtil.renderListItem({
                callback: () => this.handlerSettingItemClick('About'),
                text: '关于',
                leftIconName: 'person',
                rightIconName: 'chevron-right',
                leftIconStyle: { color: state.theme },
                rightIconStyle: { color: state.theme }
              })}

              <Text style={styles.menuTitle}>关于</Text>
              {ViewUtil.renderListItem({
                callback: () => this.handlerCheckUpdate(),
                text: '检查更新',
                leftIconName: 'person',
                rightIconName: 'chevron-right',
                leftIconStyle: { color: state.theme },
                rightIconStyle: { color: state.theme }
              })}
              <Button
                title="222333"
              />
            </ScrollView>
            <CustomTheme
              visible={state.customThemeVisible}
              onClose={() => {
                this.setState({
                  customThemeVisible: false
                });
              }}
            />
          </View>
        )
        : null
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3'
  },
  line: {
    flex: 1,
    height: 1,
    opacity: .5,
    backgroundColor: '#999'
  },
  menuTitle: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    color: '#999'
  }
});
