import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl, AsyncStorage } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import api from '../api';

export default class HotTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      searchDataResult: [],
      hotCollection: []
    };
  }

  componentDidMount = async () => {
    this.searchData();
  };

  // normal 状态下才会执行
  searchData = async () => {
    this.setState({
      isLoading: true
    });
    const { props } = this;
    const actionType = props.actionType;
    // 获取收藏的列表
    const hotCollection = await AsyncStorage.getItem('hotCollection');
    if (hotCollection != null) {
      this.setState({
        hotCollection: JSON.parse(hotCollection)
      });
    }
    switch (actionType) {
      case 'normal':
        // normal 需要获取仓库数据
        const url = `http://api.github.com/search/repositories?q=${props.path}&sort=starts`;
        const result = await api.selectHot(url);
        this.setState({
          isLoading: false,
          searchDataResult: result.items
        });
        break;
      case 'favorite':
        this.setState({
          isLoading: false
        });
        break;
    }
  };

  // 添加收藏的方法
  favorite = (item) => {
    const { state } = this;
    const hotCollection = state.hotCollection;
    // 不存在此收藏则添加
    const index = hotCollection.findIndex(_item => _item.id === item.id);
    if (index === -1) {
      hotCollection.push(item);
      this.setState({
        hotCollection
      });
      AsyncStorage.setItem('hotCollection', JSON.stringify(hotCollection));
    } else {
      // 存在则取消
      hotCollection.splice(index, 1);
      this.setState({
        hotCollection
      });
      AsyncStorage.setItem('hotCollection', JSON.stringify(hotCollection));
    }
  };

  _renderItem = ({ item }) => {
    const { props, state } = this;
    return (
      <TouchableOpacity
        style={{ flex: 1, boxShadow: '2' }}
        onPress={() => {
          props.navigation.push('RepositoryDetail', {
            item,
            isFavorite: state.hotCollection.findIndex(_item => _item.id === item.id) > -1,
            actionType: 'hot',
            parentObj: this
          });
        }}
      >
        <View style={{
          marginBottom: 11,
          padding: 15,
          shadowOffset: { width: 10, height: 10, },
          shadowColor: '#000',
          shadowOpacity: .8,
          elevation: 3, backgroundColor: '#fff'
        }}>
          <Text style={{ marginBottom: 2, fontSize: 20, color: '#232323' }}>{item.full_name}</Text>
          <Text style={{ marginBottom: 2, fontSize: 15, color: '#999' }}>{item.description}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginRight: 10 }}>Author:</Text>
              <Image
                style={{ width: 22, height: 22 }}
                source={{ uri: item.owner.avatar_url }}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text>Starts:</Text>
              <Text>{item.stargazers_count}</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.favorite(item)}
            >
              <MaterialIcons
                name={state.hotCollection.findIndex(_item => _item.id === item.id) > -1 ? 'favorite' : 'favorite-border'}
                size={23}
                color={state.hotCollection.findIndex(_item => _item.id === item.id) > -1 ? '#06f' : '#999'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render = () => {
    const { props, state } = this;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={state.isLoading}
              onRefresh={this.searchData}
              colors={['#06f', '#23c9ff', '#5dbdff']}
            />}
          keyExtractor={(item) => item.id + ''}
          data={props.actionType === 'normal' ? state.searchDataResult : state.hotCollection}
          renderItem={this._renderItem}
        />
      </View>
    );
  };
}
