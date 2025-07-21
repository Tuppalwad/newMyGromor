import { Image, StyleSheet, View } from 'react-native';
import CustomPopupModal from './custom-popup-modal';
// import 'react-native-get-random-values'
import WebView from "react-native-webview";
import React, { useEffect, useState } from "react";
import { width, height } from '../../../src/config/resposiveSize';
import { palette } from '../../theme/color';
import { typography } from '../../theme/typography';

const Webview_popup = ({ popupVisible = false, popupTitle = "", onPressClose, WebViewURL = "",
    isPopupHidden = false, isfullScreen = false, isHtml = false }) => {

    const colors = palette
    const font = typography
    const styles = style(colors);
    const [isLoadingTerms, setIsLoadingTerms] = useState(true)

    const renderWebviewCard = (WebViewURL_Link) => {

        return (
            <WebView
                source={isHtml ? { html: WebViewURL_Link } : { uri: WebViewURL_Link }}
                showsVerticalScrollIndicator={false}
                onLoadStart={() => { setIsLoadingTerms(true) }}
                onLoadEnd={() => { setIsLoadingTerms(false) }}
                startInLoadingState={true}
                scalesPageToFit={false}
                originWhitelist={['*']}
                domStorageEnabled={true}
                incognito={true}
                onMessage={event => {
                    const data = JSON.parse(event.nativeEvent.data);
                    // console.log('MESSAGE', data);
                }}
                onError={err => {
                    // console.log('Error', err);
                }}
                onHttpError={err => {
                    // console.log('Error', err);
                }}
            />
        )

    }


    return (
        <>
            {isPopupHidden ?
                <View style={{ flex: 1, justifyContent: "center", margin: isfullScreen ? 0 : width / 100 * 4, borderColor: isfullScreen ? palette.white : palette.lightYellowBorder, borderWidth: 6, borderRadius: 4 }}>
                    {renderWebviewCard(WebViewURL)}
                </View>
                :
                <CustomPopupModal
                    visible={popupVisible}
                    title={popupTitle}
                    showButton={false}
                    iconHideStatus={true}
                    modalStyle={{ minHeight: '50%', margin: width / 100 * 2, padding: width / 100 * 1 }}
                    onPressClose={onPressClose} >
                    <View style={{ height: '80%', width: "96%", padding: width / 100 * 1, borderRadius: width / 100 * 1, backgroundColor: colors.lighOrangeBg }}>
                        {renderWebviewCard(WebViewURL)}
                    </View>
                </CustomPopupModal>
            }
        </>
    );
};

export default Webview_popup;

const style = props =>
    StyleSheet.create({
        container: {
            marginVertical: 10,
        },
        buttonsRow: {
            // flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
        },
        button: {
            backgroundColor: props.white,
            borderWidth: 1,
            borderColor: props.darkblue,
            width: "100%"
        }
    });
