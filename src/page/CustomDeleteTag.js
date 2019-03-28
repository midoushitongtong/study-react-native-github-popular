import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Checkbox from 'react-native-check-box';
import Feather from 'react-native-vector-icons/Feather';
import ThemeConnect from "../core/ThemeConnect";

export default class CustomDeleteTag extends ThemeConnect {
  static navigationOptions = ({ navigation, screenProps }) => ({
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
    headerTitle: navigation.state.params.actionType === 'hot'
      ? '移除热门标签'
      : navigation.state.params.actionType === 'trending'
        ? '移除趋势标签'
        : '',
    headerRight: (
      <TouchableOpacity
        style={{ margin: 10 }}
        onPress={() => navigation.state.params.saveTag()}
      >
        <Text>移除</Text>
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      // 是否修改了数据
      changeDataStatus: false,
      // 页面的操作类型[正常操作, 删除操作]
      actionType: false,
      // 仓库标签
      tag: [],
      // 删除用的备份仓库标签
      tagBuf: [],
      // 选中删除仓库的 id
      deleteTagId: []
    };
  }

  componentDidMount = async () => {
    const { props } = this;

    // 监听 Android 回退事件
    BackHandler.addEventListener('hardwareBackPress', this._goBack);

    // navigation 所需的参数
    props.navigation.setParams({
      goBack: this._goBack,
      saveTag: this._saveTag
    });

    const actionType = props.navigation.state.params.actionType;

    let tag = [];
    // 先从本地数据库获取数据，本地数据库为空从配置文件获取数据
    switch (actionType) {
      case 'hot':
        tag = await AsyncStorage.getItem('hotTag');
        if (tag !== null) {
          tag = JSON.parse(tag);
        } else {
          tag = require('../config/default_hot_tag');
        }
        break;
      case 'trending':
        tag = await AsyncStorage.getItem('trendingTag');
        if (tag !== null) {
          tag = JSON.parse(tag);
        } else {
          tag = require('../config/default_trending_tag');
        }
        break;
    }

    // 备份仓库数据
    this.setState({
      tagBuf: JSON.parse(JSON.stringify(tag))
    });

    // 删除操作设置 checked 状态为 false
    tag = tag.map(item => {
      item.checked = false;
      return item;
    });

    this.setState({
      tag,
      actionType
    });
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this._goBack);
  };

  _goBack = async () => {
    const { state, props } = this;
    if (state.changeDataStatus) {
      Alert.alert(
        '提升',
        '确定保存修改吗？',
        [
          {
            text: '不保存',
            onPress: () => props.navigation.pop()
          },
          {
            text: '保存',
            onPress: this._saveTag
          }
        ]
      );
    } else {
      props.navigation.pop();
    }
  };

  _saveTag = async () => {
    const { props, state } = this;
    const newTag = state.tagBuf.filter(item => {
      // 找到匹配的数据
      const tag = state.tag.find(item2 => item2.id === item.id);
      return tag.checked === false;
    });
    // 保存数据到本地数据库
    switch (state.actionType) {
      case 'hot':
        await AsyncStorage.setItem('hotTag', JSON.stringify(newTag));
        break;
      case 'trending':
        await AsyncStorage.setItem('trendingTag', JSON.stringify(newTag));
        break;
    }
    props.navigation.pop();
  };

  render = () => {
    const { state } = this;
    return (
      <View stlye={{ flex: 1 }}>
        <ScrollView>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {
              state.tag.map((item, index) => {
                if (index % 2 !== 0) return;
                // 一行显示两个 checkbox
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      borderBottomWidth: 1,
                      borderBottomStyle: 'solid',
                      borderBottomColor: '#999'
                    }}
                    key={index}
                  >
                    <Checkbox
                      style={{ width: '50%', padding: 10 }}
                      checkedCheckBoxColor={state.theme}
                      isChecked={item.checked}
                      leftText={item.name}
                      onClick={() => {
                        // 更新选中状态
                        const newData = state.tag;
                        newData[index].checked = !newData[index].checked;
                        this.setState({
                          changeDataStatus: true,
                          tag: newData
                        });
                      }}
                    />
                    {
                      index + 1 < state.tag.length
                        ? <Checkbox
                          style={{ flex: 1, padding: 10 }}
                          checkedCheckBoxColor={state.theme}
                          isChecked={state.tag[index + 1].checked}
                          leftText={state.tag[index + 1].name}
                          onClick={() => {
                            // 更新选中状态
                            const newData = state.tag;
                            newData[index + 1].checked = !newData[index + 1].checked;
                            this.setState({
                              changeDataStatus: true,
                              tag: newData
                            });
                          }}
                        />
                        : null
                    }
                  </View>
                );
              })
            }
          </View>
        </ScrollView>
      </View>
    );
  };
}
