import {Dimensions, StyleSheet, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');
const Isplatform_Android = Platform.OS == 'android' ? true : false;
const Isplatform_IOS = !Isplatform_Android;

const LG_BG_THEME = {
  Font_Grey: '#939393',
};

const View_Spacing = {
  VS_H1: (height / 100) * 1,
  VS_H05: (height / 100) * 0.5,
  VS_H1_5: (height / 100) * 1.5,
  VS_H2: (height / 100) * 2,
  VS_H3: (height / 100) * 3,
  VS_H4: (height / 100) * 4,
  VS_H5: (height / 100) * 5,
  VS_H6: (height / 100) * 6,
  VS_H7: (height / 100) * 7,
  VS_H8: (height / 100) * 8,
  VS_H9: (height / 100) * 9,
  VS_H10: (height / 100) * 10,
  VS_H12: (height / 100) * 12,
  VS_H15: (height / 100) * 15,
  VS_H18: (height / 100) * 18,
  VS_H20: (height / 100) * 20,
  VS_H30: (height / 100) * 30,
  VS_H35: (height / 100) * 35,
  VS_H50: (height / 100) * 50,
  VS_W_05: (width / 100) * 0.5,
  VS_W1: (width / 100) * 1,
  VS_W2: (width / 100) * 2,
};

const Basic_Viewdimension = {
  VD_BorderWidth: (width / 100) * 0.25,
  VD_BorderWidth_V5: (width / 100) * 0.5,
  VD_Text_BorderWidth: (width / 100) * 0.3,
  VD_BorderRadius: (width / 100) * 1,
  VD_TextInput: (height / 100) * 7,
  VD_letterSpacing: (width / 100) * 0.2,
  VD_TextSpacing: (height / 100) * 2,
  Info_PaddingView: (width / 100) * 1,
  Active_Opacity: 0.8,
  boxtextpadding: (width / 100) * 1,
  Overall_Containerview: (height / 100) * 2,

  Elevation_Width: (width / 100) * 2,
};

const Basic_Validations = {
  Only_Number: /[^0-9]/g,
  Only_Words: /[^a-zA-Z]/g,
  OnlySpaceWords: /[^a-zA-Z ]/g,
  AlphaNumeric_ID: /[^a-zA-Z0-9/,.-]/g,
  AlphaNumeric_Chars: /[^a-zA-Z0-9\s/,.&-]/g,
  active_Opacity: 1,
  InActive_Opacity: 0.5,
};

const config_Swipe = {
  velocityThreshold: 0.1,
  directionalOffsetThreshold: 50,
};

const keyboardVerticalOffset = Isplatform_Android
  ? (height / 100) * 8
  : (height / 100) * 8;

export {
  width,
  height,
  Isplatform_Android,
  Isplatform_IOS,
  LG_BG_THEME,
  View_Spacing,
  config_Swipe,
  Basic_Viewdimension,
  Basic_Validations,
  keyboardVerticalOffset,
};
