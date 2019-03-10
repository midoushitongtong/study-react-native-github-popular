import React from 'react';
import { View, Button, ScrollView, TouchableHighlight, StyleSheet, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ViewUtil from '../util/ViewUtil';

export default class My extends React.Component {
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

  render = () => {
    return (
      <View style={styles.container}>
        <ScrollView>
          {ViewUtil.renderListItem(
            () => this.handlerSettingItemClick('About'),
            'code',
            'GitHub Popular',
            'chevron-right',
            { paddingVertical: 35 },
            { fontSize: 50 },
            { fontSize: 15 }
          )}
          {/* trending */}
          <Text style={styles.menuTitle}>趋势管理</Text>
          {ViewUtil.renderListItem(
            () => this.handlerSettingItemClick('CustomTag', { actionType: 'trending' }),
            'list',
            '自定义趋势标签',
            'chevron-right'
          )}
          {ViewUtil.renderListItem(
            () => this.handlerSettingItemClick('CustomDeleteTag', { actionType: 'trending' }),
            'delete',
            '移除趋势标签',
            'chevron-right'
          )}

          {/* popular */}
          <Text style={styles.menuTitle}>热门管理</Text>
          {ViewUtil.renderListItem(() => this.handlerSettingItemClick('CustomTag', { actionType: 'hot' }),
            'list',
            '自定义热门标签',
            'chevron-right'
          )}
          {ViewUtil.renderListItem(() => this.handlerSettingItemClick('CustomDeleteTag', { actionType: 'hot' }),
            'delete',
            '移除热门标签',
            'chevron-right'
          )}

          {/* setting */}
          <Text style={styles.menuTitle}>设置</Text>
          {ViewUtil.renderListItem(() => this.handlerSettingItemClick(''),
            'color-lens',
            '自定义主题',
            'chevron-right'
          )}
          {ViewUtil.renderListItem(() => this.handlerSettingItemClick(''),
            'person',
            '关于',
            'chevron-right'
          )}
        </ScrollView>
      </View>
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
