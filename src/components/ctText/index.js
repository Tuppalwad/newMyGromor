import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { palette } from '../../theme/color';
import { typography } from '../../theme/typograph';
// import { palette, typography } from '../../theme';

const CTText = ({ style, textColor = '#505050',
  text, numberOfLines, nestedtext = "", nestedtext_textColor,
  nestedtext_onPress, black, extraBold,
  bold, semiBold, light, medium, onPress, underline, nextedstyle,
  nestedsemiBold, nestedBold, fontSize = RFValue(12), italic, }) => {


  const textStyle = {
    ...styles.defaultStyle,
    ...{ color: textColor, fontFamily: typography?.regular },
    ...{ fontSize: fontSize },
    ...style,
  };

  const nestedtext_textStyle = nextedstyle ? {
    ...styles.defaultStyle,
    ...{ color: nestedtext_textColor, fontFamily: typography?.regular },
    ...{ fontSize: fontSize },
    ...nextedstyle
  } : {
    ...styles.defaultStyle,
    ...{ color: nestedtext_textColor, fontFamily: typography?.regular },
    ...{ fontSize: fontSize },
    ...style
  };

  const render_text = () => {
      return (
        <Text
          onPress={nestedtext_onPress}
          style={[
            nestedtext_textStyle,
            black && { fontFamily: typography?.black },
            extraBold && { fontFamily: typography?.extraBold },
            nestedBold && { fontFamily: typography?.bold },
            nestedsemiBold && { fontFamily: typography?.semiBold },
            underline && { textDecorationLine: 'underline' },
          ]}
          numberOfLines={numberOfLines}>
          {"  " + nestedtext}
        </Text>
      )
  }

  return (
    <Text
      onPress={onPress}
      style={[
        textStyle,
        black && { fontFamily: typography?.black },
        extraBold && { fontFamily: typography?.extraBold },
        bold && { fontFamily: typography?.bold },
        semiBold && { fontFamily: typography?.semiBold },
        medium && { fontFamily: typography?.medium },
        light && { fontFamily: typography?.light },
        underline && { textDecorationLine: 'underline' },
        italic && { fontFamily: typography?.italic }
      ]}
      numberOfLines={numberOfLines}>
      {text}
      {nestedtext != "" && render_text()}
    </Text>
  );
};
const styles = StyleSheet.create({
  defaultStyle: {
    fontSize: RFValue(12),
    color: palette.grey,
  },
});

export default CTText;
