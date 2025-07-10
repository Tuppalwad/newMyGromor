import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { isNil, isEmpty, isEqual } from 'lodash';
// import { Icon } from "../../../assets/images";
import warning from '../../assets/images/common/warning.png';
import info from '../../assets/images/common/info.png';
import successTick from '../../assets/images/common/success.png';



export const ToastConfig = {
  success: (internalState) => <ToastComponent state={internalState} />,
  error: (internalState) => <ToastComponent state={internalState} />,
  info: (internalState) => <ToastComponent state={internalState} />,
};

export const HEToast = (text, type = 'info') => {

  const appLanguage = null

  Toast.show({
    type: type,
    position: 'top',
    text1:
      isNil(text) || isEmpty(text) || isEqual(text, '')
        ? appLanguage?.lblInternalerrorPleasetry ?? 'Internal error. Please try again later'
        : text,
    text2: '',
    visibilityTime: 2000,
    autoHide: true,
    topOffset: 60,
    bottomOffset: 0,
    onShow: () => { },
    onHide: () => { },
  });
  ReactNativeHapticFeedback.trigger('impactLight', {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  });
};

const ToastComponent = ({ state }) => {
  const colors = palette;
  const { text1 } = state; // with its type we can handle different types of toast
  const { type } = state

  const renderColor = () => {
    if (type === 'error') {
      return colors.red
    } else if (type === 'info') {
      return colors.green
    } else {
      return colors.green
    }
  }

  const renderImage = () => {
    if (type === 'error') {
      return warning
    } else if (type === 'info') {
      return info
    } else {
      return successTick
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.container, { borderColor: renderColor(), backgroundColor: colors.white, shadowColor: colors.gray }]}>
        <Image
          source={renderImage()}
          style={[styles.imageStyle, { tintColor: renderColor() }]}
          resizeMode='contain'
        />
        <Text numberOfLines={6} style={[styles.textStyle, { color: colors.gray }]}>{text1}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    // minHeight: 60,
    bottom: 20,
  },
  container: {
    flex: 1,
    minHeight: 60,
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    borderLeftWidth: 8,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 8,
    paddingVertical: 10
  },
  textStyle: {
    fontSize: 14,
    flex: 1,
    marginRight: 10,
    // fontFamily: typography.medium
  },
  imageStyle: {
    width: 25,
    height: 25,
    marginHorizontal: 15,
  },
});
