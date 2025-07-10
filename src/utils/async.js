import AsyncStorage from "@react-native-async-storage/async-storage";

export const setBoolAsync = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, value.toString());
  } catch (err) {
    console.error(err);
  }
};

export const getBoolAsync = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return Boolean(value);
    }

    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const setStringAsync = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.error(err);
  }
};

export const getStringAsync = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return value;
    }

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const setJsonAsync = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(err);
  }
};

export const getJsonAsync = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.error("removed token", err);
  }
};



export const updateAsync = async (key, value) => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(err);
  }
}