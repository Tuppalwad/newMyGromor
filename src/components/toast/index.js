import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Toast from 'react-native-toast-message';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {isNil, isEmpty, isEqual} from 'lodash';
import {Icon} from "../../../assets/images";
// import { palette, typography } from '../../theme';
import { UserManager } from '../../storage'
// import { palette } from '../../theme/color';
// import { typography } from '../../theme/typograph';


export const ToastConfig = {
  success: (internalState) => <ToastComponent state={internalState} />,
  error: (internalState) => <ToastComponent state={internalState} />,
  info: (internalState) => <ToastComponent state={internalState} />,
};

export const HEToast = (text, type = 'info') => {

  const appLanguage = UserManager?.getAppMultiLanguage

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
    onShow: () => {},
    onHide: () => {},
  });
  ReactNativeHapticFeedback.trigger('impactLight', {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  });
};

const ToastComponent = ({state}) => {
  const colors = "";
  const {text1} = state; // with its type we can handle different types of toast
  const {type}=state

  const renderColor = ()=>{
    if(type === 'error'){
      return "red"
    }else if(type==='info'){
      return "green"
    }else{
      return "#00BFFF"
    }
  }

  const renderImage= ()=>{
    if(type === 'error'){
      return Icon.warning
    }else if(type==='info'){
      return Icon.info
    }else{
      return Icon.successTick
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={[ styles.container,{borderColor: renderColor(),backgroundColor:"#ffff",shadowColor:"#000"}]}>
        <Image
          source={renderImage()}
          style={[styles.imageStyle, {tintColor: renderColor()}]}
          resizeMode='contain'
        />
        <Text numberOfLines={6} style={[styles.textStyle, {color:"#999"}]}>{text1}</Text>
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
    paddingVertical:10
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
