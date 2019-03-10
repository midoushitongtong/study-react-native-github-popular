import React from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-easy-toast';
import HotTag from '../component/HotTag';

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <Feather
          style={{ margin: 11 }}
          name="arrow-left"
          size={20}
        />
      </TouchableOpacity>
    ),
    headerTitle: (
      <View style={{ flex: 1, paddingVertical: 10 }}>
        <TextInput
          style={{ backgroundColor: '#e1e1e1', borderRadius: 2 }}
          onChangeText={(value) => navigation.state.params && navigation.state.params.changeSearchKeyword(value)}
          value={navigation.state.params && navigation.state.params.searchKeyword}
        />
      </View>
    ),
    headerRight: (
      <TouchableOpacity
        style={{ margin: 11 }}
        onPress={() => navigation.state.params && navigation.state.params.handlerSearch()}
      >
        <Text>{navigation.state.params && navigation.state.params.searchLoadingFlag === true ? '取消' : '搜索'}</Text>
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      // 是否是第一次搜索数据
      firstSearchLoadingFlag: false,
      // 是否正在搜索数据中
      searchLoadingFlag: false,
      // 搜索关键字
      searchKeyword: '',
      // 是否可见添加按钮
      showAddHotTagContainer: false,
      // 当前的热门标签
      hotTag: []
    };
  }

  componentDidMount = async () => {
    const { props, state } = this;
    props.navigation.setParams({
      searchLoadingFlag: state.searchLoadingFlag,
      searchKeyword: state.searchKeyword,
      changeSearchKeyword: this.changeSearchKeyword,
      handlerSearch: this.handlerSearch
    });

    const storageRepositoryTag = await AsyncStorage.getItem('hotTag');
    this.setState({
      hotTag: storageRepositoryTag !== null
        ? JSON.parse(storageRepositoryTag)
        : require('../config/default_hot_tag')
    });
  };

  /**
   * 改变搜索关键字
   *
   * @param searchKeyword
   */
  changeSearchKeyword = (searchKeyword) => {
    const { props } = this;
    this.setState({
      searchKeyword
    });
    props.navigation.setParams({
      searchKeyword
    });
  };

  /**
   * 搜索数据
   *
   */
  handlerSearch = () => {
    const { props, state } = this;
    if (state.searchLoadingFlag) {
      this.setState({
        searchLoadingFlag: false
      });
      props.navigation.setParams({
        searchLoadingFlag: false
      });
      // 取消搜索
      if (this.refs['hotTag']) {
        this.refs['hotTag'].cancelSearch();
      }
    } else {
      this.setState({
        searchLoadingFlag: true
      });
      props.navigation.setParams({
        searchLoadingFlag: true
      });
      // 已经搜索过了, 刷新搜索结果
      if (this.refs['hotTag']) {
        this.refs['hotTag'].searchData();
      }
    }
  };

  /**
   * 添加搜索关键字到热门标签
   *
   */
  addSearchKeywordToHotTag = async () => {
    const { state } = this;
    const newHotTag = state.hotTag;
    newHotTag.unshift({
      id: newHotTag.length,
      path: state.searchKeyword.toLowerCase(),
      name: state.searchKeyword,
      checked: true
    });
    await AsyncStorage.setItem('hotTag', JSON.stringify(newHotTag));
    this.refs['toast'].show('添加成功', 1500);
    this.setState({
      showAddHotTagContainer: false
    });
  };

  render = () => {
    const { props, state } = this;
    return (
      <View style={styles.container}>
        {state.searchLoadingFlag || state.firstSearchLoadingFlag
          ? (
            <HotTag
              ref="hotTag"
              actionType="normal"
              path={state.searchKeyword}
              {...props}
              searchDataComplete={() => {
                if (!state.firstSearchLoadingFlag) {
                  // 第一次搜索已完成
                  this.setState({
                    firstSearchLoadingFlag: true
                  });
                }
                this.setState({
                  searchLoadingFlag: false
                });
                props.navigation.setParams({
                  searchLoadingFlag: false
                });
                // 是否需要显示添加标签按钮
                if (state.hotTag.findIndex(item => item.name.toLowerCase() === state.searchKeyword.toLowerCase()) === -1) {
                  this.setState({
                    showAddHotTagContainer: true
                  });
                } else {
                  this.setState({
                    showAddHotTagContainer: false
                  });
                }
              }}
            />
          )
          : null}
        {state.showAddHotTagContainer
          ? (
            <View style={styles.addHotTagContainer}>
              <Button
                title="添加到热门标签"
                onPress={() => this.addSearchKeywordToHotTag()}
              />
            </View>
          ) : null}
        <Toast ref="toast" position="bottom" positionValue={200}/>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  addHotTagContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 23,
    justifyContent: 'center',
    paddingHorizontal: 20
  }
});
