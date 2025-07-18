export const typography = {
  black: 'Poppins-Black' ?? 'System',
  extraBold: 'Poppins-ExtraBold' ?? 'System',
  bold: 'Poppins-ExtraBold' ?? 'System',
  semiBold: 'Poppins-SemiBold' ?? 'System',
  medium: 'Poppins-Medium' ?? 'System',
  regular: 'Poppins-Regular' ?? 'System',
  light: 'Poppins-Regular' ?? 'System',
  italic: 'Poppins-Italic' ?? 'System',
};

import { RFValue } from "react-native-responsive-fontsize";

export const textSize = {
  tiny: RFValue(10),
  xs: RFValue(11),
  sm: RFValue(12),
  md: RFValue(13),
  xmd: RFValue(14),
  lg: RFValue(16),
  xlg: RFValue(18),
  mlg: RFValue(20),
  ulg: RFValue(22),
  exl: RFValue(26),
};
