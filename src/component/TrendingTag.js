import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import api from '../api';

export default class RepositoryTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      searchDataResult: [],
      trendingCollection: []
    };
  }

  componentDidMount = async () => {
    this.searchData();
  };

  searchData = async () => {
    const { props } = this;
    this.setState({
      isLoading: true
    });
    const actionType = props.actionType;
    // 获取收藏列表
    const trendingCollection = await AsyncStorage.getItem('trendingCollection');
    if (trendingCollection != null) {
      this.setState({
        trendingCollection: JSON.parse(trendingCollection)
      });
    }
    switch (actionType) {
      case 'normal':
        // normal 需要获取仓库数据
        const url = `https://github.com/trending/${props.path}?since=${props.since}`;
        const result = await api.selectTrending(url);
        this.setState({
          isLoading: false,
          searchDataResult: result
        });
        break;
      case 'favorite':
        this.setState({
          isLoading: false
        });
        break;
    }
  };

  favorite = (item) => {
    const { state } = this;
    const trendingCollection = state.trendingCollection;
    // 不存在此收藏则添加
    const index = trendingCollection.findIndex(_item => _item.id === item.id);
    if (index === -1) {
      trendingCollection.push(item);
      this.setState({
        trendingCollection
      });
      AsyncStorage.setItem('trendingCollection', JSON.stringify(trendingCollection));
    } else {
      // 存在则取消
      trendingCollection.splice(index, 1);
      this.setState({
        trendingCollection
      });
      AsyncStorage.setItem('trendingCollection', JSON.stringify(trendingCollection));
    }
  };

  _renderItem = ({ item }) => {
    item.id = item.fullName;
    item.full_name = item.fullName;
    item.html_url = `https://github.com/${item.url}`;
    const { state, props } = this;
    return (
      <TouchableOpacity
        style={{ flex: 1, boxShadow: '2' }}
        onPress={() => {
          props.navigation.push('RepositoryDetail', {
            item,
            isFavorite: state.trendingCollection.findIndex(itemId => itemId.id === item.id) > -1,
            actionType: 'trending',
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
          <Text style={{ marginBottom: 2, fontSize: 20, color: '#232323' }}>{item.fullName}</Text>
          <Text style={{ marginBottom: 2, fontSize: 15, color: '#999' }}>{item.description}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginRight: 10 }}>Build by:</Text>
              {item.contributors.map((con, index) => (
                <Image
                  key={index}
                  style={{ width: 22, height: 22 }}
                  source={{ uri: con }}
                />
              ))}
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text>Starts:</Text>
              <Text>{item.meta}</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.favorite(item)}
            >
              <MaterialIcons
                name={state.trendingCollection.findIndex(_item => _item.id === item.id) > -1 ? 'favorite' : 'favorite-border'}
                size={23}
                color={state.trendingCollection.findIndex(_item => _item.id === item.id) > -1 ? props.iconColor : '#999'}
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
            />
          }
          keyExtractor={(item) => item.url}
          data={props.actionType === 'normal' ? state.searchDataResult : state.trendingCollection}
          renderItem={this._renderItem}
        />
      </View>
    );
  };
}
