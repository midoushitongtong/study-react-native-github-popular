import React from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet, DeviceInfo } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default class MenuDialog extends React.Component {
  static defaultProps = {
    iconName: '',
    menuList: [],
    callback: () => {
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  render = () => {
    const { props } = this;
    return (
      <View>
        <Feather
          size={20}
          name={props.iconName}
          style={{ marginRight: 11, color: props.iconColor }}
          onPress={() => {
            this.setState({
              visible: true
            });
          }}
        />
        <Modal
          ref="modDialog"
          transparent={true}
          visible={this.state.visible}
        >
          <TouchableOpacity
            style={styles.touchableOpacityContainer}
            onPress={() => {
              this.setState({
                visible: false
              });
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#e1e1e1',
                backgroundColor: '#fff'
              }}
            >
              {props.menuList.map((menuItem, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    this.setState({
                      visible: false
                    });
                    props.callback(index);
                  }}
                  underlayColor={'transparent'}
                  style={{
                    padding: 10
                  }}
                >
                  <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontSize: 16 }}>{menuItem.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  touchableOpacityContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .1)',
    alignItems: 'flex-end',
    paddingTop: 55
  }
});
