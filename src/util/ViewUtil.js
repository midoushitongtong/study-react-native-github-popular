import React from 'react';
import { View, Button, ScrollView, TouchableHighlight, StyleSheet, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default {
  /**
   * 设置菜单项
   *
   */
  renderListItem: (callback, leftIconName, text, rightIconName, containerStyle = {}, leftIconStyle = {}, leftTextStyle = {}, rightIconStyle = {}) => {
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
                    style={[{ color: '#06f', marginRight: 39, ...leftIconStyle }]}
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
                  style={[{ color: '#06f', ...rightIconStyle }]}
                />
              )
              : null}
          </View>
          <View style={styles.line}/>
        </View>
      </TouchableHighlight>
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
