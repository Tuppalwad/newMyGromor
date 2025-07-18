import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from '../../../assets/images';
// import CTButton from '../CTButton';
import CTText from '../ctText';
import {ToastConfig} from '../toast';
import Toast from 'react-native-toast-message';
// import Indicator from '../indicator';
import {RFValue} from 'react-native-responsive-fontsize';
import {width, height, View_Spacing} from '../../config/resposiveSize';
import { palette } from '../../theme/color';
import { typography } from '../../theme/typography';
import CTButton from './CTButton';
import Indicator from './Indicator';

// import {palette, typography} from '../../theme';

const CustomPopupModal = ({
  onPressClose,
  onPressDone,
  onPressDone1,
  title = '',
  visible,
  children,
  icon = Icon.likes,
  hideLine = false,
  buttonText = 'Ok',
  showSubmitButton = false,
  modalStyle,
  showButton = true,
  showButton1 = true,
  showButton2 = true,
  onPressButton2,
  button2Text,
  buttonText1,
  addIconBorder,
  bottomDescription,
  buttonContainerStyle,
  loading = false,
  Icon_status = false,
  BottomPopupStatus = false,
  modalStyle_Design = 'center',
  iconHideStatus = false,
  titleHideStatus = false,
  closeIconPaddingStatus = true,
  qrViewStatus = false,
  marginTop_Status = false,
  isHiddenCrossIcon = false,
  isRed = false,
}) => {
  const colors = palette;
  const font = typography;

  const styles = style(colors);
  const button1Style = {
    ...styles.button,
    width: onPressButton2 ? (width / 100) * 40 : (width / 100) * 80,
  };
  let modalStyle_Bottomstatus = BottomPopupStatus
    ? 'flex-end'
    : modalStyle_Design;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType={'slide'}
      onRequestClose={onPressClose}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView
          nestedScrollEnabled={true}
          style={styles.container}
          contentContainerStyle={{
            justifyContent: modalStyle_Bottomstatus,
            marginTop: modalStyle_Design == 'flex-start' ? 50 : 0,
            flexGrow: 1,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              justifyContent: 'center',
              flex: 1,
              position: 'absolute',
              height: '100%',
              width: '100%',
            }}
            onPress={onPressClose}
          />
          <View
            style={[
              BottomPopupStatus ? styles.modal_Bottom : styles.modal,
              modalStyle,
            ]}>
            {onPressClose && !isHiddenCrossIcon && (
              <TouchableOpacity
                style={
                  closeIconPaddingStatus
                    ? styles.closeIcon_Paddingstyle
                    : styles.closeIcon_style
                }
                onPress={onPressClose}>
                <Image
                  source={Icon.closeTitleIcon}
                  style={
                    closeIconPaddingStatus ? styles.close : styles.closeIcon
                  }
                />
              </TouchableOpacity>
            )}

            <View style={{height: marginTop_Status ? View_Spacing.VS_H2 : 0}} />
            {icon && !iconHideStatus && (
              <View style={[addIconBorder && styles.borderedIcon]}>
                <Image
                  source={icon}
                  resizeMode={'contain'}
                  style={[
                    Icon_status
                      ? styles.like_OTP
                      : isRed
                      ? styles.RedLike
                      : styles.like,
                    addIconBorder && {
                      width: Icon_status
                        ? (width / 100) * 15
                        : (width / 100) * 6,
                      height: Icon_status
                        ? (width / 100) * 15
                        : (width / 100) * 6,
                      marginBottom: 0,
                    },
                  ]}
                />
              </View>
            )}

            {!titleHideStatus && (
              <>
                {(title || !hideLine) && (
                  <View style={{width: '100%'}}>
                    {title && (
                      <CTText
                        text={title}
                        semiBold
                        style={{textAlign: 'center'}}
                        textColor={isRed ? colors.red : colors.titleGreen}
                        fontSize={RFValue(14)}
                      />
                    )}
                    {!hideLine && (
                      <View style={isRed ? styles.redLine : styles.line} />
                    )}
                    {hideLine && <View style={styles.emptyLine} />}
                  </View>
                )}
              </>
            )}

            {children}

            {showButton && (
              <View
                style={[
                  bottomDescription
                    ? styles.buttonPaddingContainer
                    : styles.buttonContainer,
                  buttonContainerStyle,
                ]}>
                {onPressButton2 && button2Text && (
                  <CTButton
                    text={button2Text}
                    onPress={onPressButton2}
                    containerStyle={styles.button2}
                    textColor={colors.titleGreen}
                  />
                )}
                {showButton1 && (
                  <CTButton
                    text={buttonText}
                    onPress={onPressDone}
                    disabled={showSubmitButton}
                    containerStyle={button1Style}
                  />
                )}
                {showButton2 && buttonText1 && (
                  <CTButton
                    text={buttonText1}
                    onPress={onPressDone1}
                    disabled={showSubmitButton}
                    containerStyle={button1Style}
                  />
                )}
              </View>
            )}

            {qrViewStatus && (
              <CTButton
                text={buttonText}
                onPress={onPressDone}
                disabled={showSubmitButton}
                containerStyle={button1Style}
              />
            )}
            {bottomDescription && (
              <CTText
                colors={colors.grey}
                medium
                text={bottomDescription}
                fontSize={RFValue(11)}
                style={{textAlign: 'center', marginTop: 15}}
              />
            )}
          </View>
        </ScrollView>

        <Toast
          config={ToastConfig}
          // ref={ref => {
          //   Toast.setRef(ref);
          // }}
        />

        <Indicator show={loading} />
      </KeyboardAvoidingView>
    </Modal>
  );
};
export default CustomPopupModal;

const style = props =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#06093199',
    },
    modal: {
      margin: 10,
      padding: 10,
      backgroundColor: palette.white,
      borderRadius: 10,
      marginTop: (height / 100) * 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modal_Bottom: {
      padding: 20,
      backgroundColor: palette.white,
      borderRadius: 10,
      // alignItems: 'center',
    },
    close: {
      width: (width / 100) * 6,
      height: (width / 100) * 6,
    },
    closeIcon: {
      width: (width / 100) * 7,
      height: (width / 100) * 7,
    },
    line: {
      height: 3,
      width: 100,
      backgroundColor: palette.titleGreen,
      marginTop: 12,
      marginBottom: 20,
      alignSelf: 'center',
    },
    redLine: {
      height: 3,
      width: 100,
      backgroundColor: palette.red,
      marginTop: 12,
      marginBottom: 20,
      alignSelf: 'center',
    },
    emptyLine: {
      height: 3,
      width: 100,
      marginTop: 12,
      marginBottom: 20,
      alignSelf: 'center',
    },
    buttonContainer: {
      marginTop: (height / 100) * 2,
      marginBottom: (height / 100) * 2,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
    },
    buttonPaddingContainer: {
      marginTop: (height / 100) * 2,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
    },
    button: {
      width: (width / 100) * 40,
      alignSelf: 'center',
      marginHorizontal: 5,
    },
    button2: {
      width: (width / 100) * 40,
      alignSelf: 'center',
      borderWidth: 1,
      borderColor: palette.titleGreen,
      marginHorizontal: 5,
      backgroundColor: palette.white,
    },
    like: {
      width: (width / 100) * 8,
      height: (width / 100) * 8,
      alignSelf: 'center',
      marginBottom: (height / 100) * 1,
      tintColor: palette.titleGreen,
    },
    RedLike: {
      width: (width / 100) * 8,
      height: (width / 100) * 8,
      alignSelf: 'center',
      marginBottom: (height / 100) * 1,
      tintColor: palette.red,
    },
    like_OTP: {
      width: (width / 100) * 15,
      height: (width / 100) * 15,
      alignSelf: 'center',
      marginBottom: (height / 100) * 1,
      tintColor: palette.titleGreen,
    },
    borderedIcon: {
      borderWidth: 2,
      borderColor: palette.titleGreen,
      width: 50,
      height: 50,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    closeIcon_Paddingstyle: {
      width: 25,
      height: 25,
      alignItems: 'flex-end',
      alignSelf: 'flex-end',
      justifyContent: 'center',
      position: 'absolute',
      zIndex: 1,
      top: -((width / 100) * 1),
      right: -((width / 100) * 2),
    },
    closeIcon_style: {
      width: 25,
      height: 25,
      alignItems: 'flex-end',
      alignSelf: 'flex-end',
      justifyContent: 'center',
      position: 'absolute',
      zIndex: 1,
      top: (width / 100) * 4,
      right: (width / 100) * 3,
    },
  });
