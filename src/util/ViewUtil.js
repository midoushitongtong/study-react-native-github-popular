import React from 'react';
import { View, Button, ScrollView, TouchableHighlight, StyleSheet, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Dropdown } from 'react-native-material-dropdown';

export default {
  /**
   * 设置菜单项
   *
   */
  renderListItem: ({ callback, leftIconName, text, rightIconName, containerStyle = {}, leftIconStyle = {}, leftTextStyle = {}, rightIconStyle = {} }) => {
    return (
      <TouchableHighlight
        style={{ backgroundColor: '#fff' }}
        underlayColor="#e1e1e1"
        onPress={callback}
      >
        <View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 15,
            ...containerStyle
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {leftIconName
                ? (
                  <MaterialIcons
                    size={20}
                    name={leftIconName}
                    style={[{ marginRight: 39, ...leftIconStyle }]}
                  />
                )
                : null}
              <Text style={{ fontSize: 13, color: '#999', ...leftTextStyle }}>{text}</Text>
            </View>
            {rightIconName
              ? (
                <MaterialIcons
                  size={25}
                  name={rightIconName}
                  style={[{ ...rightIconStyle }]}
                />
              )
              : null}
          </View>
          <View style={styles.line}/>
        </View>
      </TouchableHighlight>
    );
  },

  /**
   * 三点式下拉菜单
   *
   */
  renderMoreMenu: ({ data, callback, iconName, pickerStyle = {}, dropdownOffset = {}, iconStyle= {} }) => {
    return (
      <Dropdown
        data={data}
        pickerStyle={{ width: 100, ...pickerStyle }}
        dropdownOffset={{ top: 50, left: -60, ...dropdownOffset }}
        renderBase={() => (
          <Feather
            size={20}
            name={iconName}
            style={{ marginRight: 11, ...iconStyle }}
          />
        )}
        valueExtractor={(item) => item.name}
        onChangeText={(value, index) => callback(value, index)}
      />
    );
  }
};

const styles = StyleSheet.create({
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
