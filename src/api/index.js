import { AsyncStorage, DeviceEventEmitter } from 'react-native';
import GithubTrending from 'GitHubTrending';

export default {
  selectHot: (url) => {
    return new Promise(async (resolve, reject) => {
      // 优先从缓存获取数据
      let localData = await AsyncStorage.getItem('hot' + url);
      if (localData != null) {
        // 缓存的数据是否已经过期(60秒)
        localData = JSON.parse(localData);
        if ((new Date().getTime() / 1000 - localData.updateTime) < 600) {
          DeviceEventEmitter.emit('showToast', '显示缓存数据');
          resolve(localData.data);
          return;
        } else {
          DeviceEventEmitter.emit('showToast', '缓存数据过期');
        }
      }
      // 从远程获取数据
      fetch(url)
        .then(response => response.json())
        .then(async result => {
          // 缓存远程数据
          const localData = {
            updateTime: new Date().getTime() / 1000,
            data: result
          };
          // await AsyncStorage.setItem('hot' + url, JSON.stringify(localData));
          DeviceEventEmitter.emit('showToast', '缓存远程数据');
          resolve(localData.data);
        })
        .catch(error => reject(error));
    });
  },
  selectTrending: (url) => {
    return new Promise(async (resolve, reject) => {
      // 优先从缓存获取数据
      let localData = await AsyncStorage.getItem('trending' + url);
      if (localData != null) {
        // 缓存的数据是否已经过期(60秒)
        localData = JSON.parse(localData);
        if ((new Date().getTime() / 1000 - localData.updateTime) < 600) {
          DeviceEventEmitter.emit('showToast', '显示缓存数据');
          resolve(localData.data);
          return;
        } else {
          DeviceEventEmitter.emit('showToast', '缓存数据过期');
        }
      }
      // 从远程获取数据
      new GithubTrending().fetchTrending(url)
        .then(async result => {
          // 缓存远程数据
          const localData = {
            updateTime: new Date().getTime() / 1000,
            data: result
          };
          // await AsyncStorage.setItem('trending' + url, JSON.stringify(localData));
          DeviceEventEmitter.emit('showToast', '缓存远程数据');
          resolve(localData.data);
        });
    });
  }
};
