import { DeviceEventEmitter } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AppTheme from '../config/app_theme';

export default {
  getTheme: async () => {
    const theme = await AsyncStorage.getItem('theme');
    if (theme !== null) {
      return theme;
    } else {
      // 保存默认主题
      await AsyncStorage.setItem('theme', AppTheme.default);
      return AppTheme.default;
    }
  },
  saveTheme: async (theme) => {
    await AsyncStorage.setItem('theme', theme);
    // 通知主题已经发生改变
    DeviceEventEmitter.emit('changeTheme', theme);
  }
};
