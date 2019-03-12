import React from 'react';
import { View, Text, Modal, Alert, StyleSheet, ScrollView, AsyncStorage, TouchableHighlight } from 'react-native';
import AppTheme from '../config/app_theme';
import ThemeUtil from '../util/ThemeUtil';

export default class CustomTheme extends React.Component {
  constructor(props) {
    super(props);
  }

  changeTheme = async (value) => {
    const { props } = this;
    await ThemeUtil.saveTheme(value);
    props.onClose();
  };

  renderThemeItems = () => {
    return (
      AppTheme.list.map((item, index) => (
        <TouchableHighlight
          key={index}
          underlayColor="#e1e1e1"
          style={styles.themeItemContainer}
          onPress={() => this.changeTheme(item.value)}
        >
          <View style={{ ...styles.themeItem, backgroundColor: item.value }}>
            <Text style={{ color: '#fff' }}>{item.name}</Text>
          </View>
        </TouchableHighlight>
      ))
    );
  };

  render = () => {
    const { props } = this;
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={props.visible}
          onRequestClose={() => props.onClose()}>
          <ScrollView>
            <View style={styles.themeWrapperContainer}>
              {this.renderThemeItems()}
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#06f'
  },
  themeWrapperContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  themeItemContainer: {
    width: '33.33333%',
    height: 115,
    padding: 10
  },
  themeItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  }
});
