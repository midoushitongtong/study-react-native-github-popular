import React from 'react';
import {
  View,
  Text,
  AsyncStorage,
  Platform,
  StyleSheet,
  Animated,
  Image,
  Alert,
  BackHandler,
  TouchableOpacity
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import Checkbox from 'react-native-check-box';
import Feather from 'react-native-vector-icons/Feather';

export default class CustomTag extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
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
      headerTitle: navigation.state.params.actionType === 'hot' ? '自定义热门标签' : '自定义趋势标签',
      headerRight: (
        <TouchableOpacity
          style={{ margin: 10 }}
          onPress={() => navigation.state.params.saveTag()}
        >
          <Text>保存</Text>
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      changeDataStatus: false,
      tag: [],
      sortTagKey: []
    };
  }

  componentDidMount = async () => {
    const { props } = this;
    props.navigation.setParams({
      goBack: this._goBack,
      saveTag: this._saveTag
    });

    const actionType = props.navigation.state.params.actionType;

    let storageTag = [];
    // 加载仓库数据
    switch (actionType) {
      case 'hot':
        storageTag = await AsyncStorage.getItem('hotTag');
        if (storageTag !== null) {
          storageTag = JSON.parse(storageTag);
        } else {
          storageTag = require('../config/default_hot_tag');
        }
        break;
      case 'trending':
        storageTag = await AsyncStorage.getItem('trendingTag');
        if (storageTag !== null) {
          storageTag = JSON.parse(storageTag);
        } else {
          storageTag = require('../config/default_trending_tag');
        }
        break;
    }

    this.setState({
      // 设置当前仓库数据
      tag: storageTag,
      actionType
    });


    // 监听 Android 回退事件
    BackHandler.addEventListener('hardwareBackPress', this._goBack);
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
    // 根据排序的 key 生成新数据
    let newTag = state.tag;
    if (state.sortTagKey.length > 0) {
      newTag = state.sortTagKey.map(index => state.tag[index]);
    }
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
      <View style={{ flex: 1 }}>
        {
          state.tag.length > 0
            ? (
              <SortableList
                style={{ flex: 1 }}
                data={state.tag}
                renderRow={this._renderRow}
                onChangeOrder={nextOrder => {
                  this.setState({
                    changeDataStatus: true,
                    // 保存所有 item 排序后的 key
                    sortTagKey: nextOrder
                  });
                }}
              />
            )
            : null
        }
      </View>
    );
  };

  _renderRow = ({ data, index }) => {
    const { state } = this;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 15,
          borderBottomStyle: 'solid',
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
          backgroundColor: '#f1f1f1'
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Feather
            size={20}
            name="align-justify"
            color="#06f"
            style={{ marginRight: 5 }}
          />
          <Text style={{ color: data.checked ? '#06f' : '#666' }}>{data.name}</Text>
        </View>
        <Checkbox
          style={{ padding: 10 }}
          checkedCheckBoxColor="#06f"
          isChecked={data.checked}
          onClick={() => {
            // 更新当前 item 选中状态
            const newTag = state.tag;
            const currentTagIndex = newTag.findIndex(item => item.id === data.id);
            newTag[currentTagIndex].checked = !newTag[currentTagIndex].checked;
            this.setState({
              changeDataStatus: true,
              tag: newTag
            });
          }}
        />
      </View>
    );
  };
}
