import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {

  getObjectValue = (key) => {
    return AsyncStorage.getItem(key);
  };

  setObjectValue = async (key, value) => {
    return AsyncStorage.setItem(key, value);
  };

  removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
    }
  };

  clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
    }
  };

}

export default new Storage();
