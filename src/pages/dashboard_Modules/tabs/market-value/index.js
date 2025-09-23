import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { WebView } from 'react-native-webview';

import constants from "../../../../config/constants";
import { palette } from "../../../../theme/color";
import CustomHeader from "../../../../components/common/CustomHeader";

const MarketValue = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        type="marketValue"
        topTitle="Market Value"
        subtitle=""
        onBackPress={() => navigation.goBack()}
        onCartPress={() => console.log('Cart pressed')}
        onNotificationPress={() => console.log('Notification pressed')}
      />

      <View style={styles.webviewContainer}>
        <WebView
          source={{ uri: constants.URL_MARKET_VALUE }}
          style={{ flex: 1 }}
          startInLoadingState={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default MarketValue;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.lightWhite,
  },
  webviewContainer: {
    flex: 1,
    overflow: 'hidden',
  },
});
