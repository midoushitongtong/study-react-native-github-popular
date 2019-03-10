import React from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

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
        <TextInput style={{ backgroundColor: '#e1e1e1', borderRadius: 2 }}/>
      </View>
    ),
    headerRight: (
      <TouchableOpacity
        style={{ margin: 11 }}
        onPress={() => {
        }}
      >
        <Text>搜索</Text>
      </TouchableOpacity>
    )
  });
  render = () => {
    return (
      <View style={styles.container}>
        <Button
          title="添加到热门标签"
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
