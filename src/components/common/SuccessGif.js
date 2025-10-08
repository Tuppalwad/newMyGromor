import React from 'react';
import { WebView } from 'react-native-webview';

const SuccessGif = ({ image }) => {
  return (
    <WebView
      source={typeof image === 'string' ? { uri: image } : image}
      originWhitelist={['*']}
      style={{
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'transparent',
      }}
      scrollEnabled={false}
      javaScriptEnabled={true}
      injectedJavaScript={`
        document.body.style.backgroundColor = 'transparent';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        true;
      `}
    />
  );
};

export default SuccessGif;


