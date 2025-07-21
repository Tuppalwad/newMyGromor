import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Icon } from '../../../assets/images/index';
// import CTText from '../ctText';
import { View_Spacing, width } from "../../config/resposiveSize";
import { RFValue } from "react-native-responsive-fontsize";
// import { palette, textSize, typography } from '../../theme';
import CTButton from "../custombutton"
import CTText from '../../ctText';
import { palette } from '../../../theme/color';

const Errordisplaycomponent = ({ Error_Title, Error_Message = "", Error_Method, Error_Status = false,
    Error_Image, Error_ButtonName = "" }) => {

    const colors = palette;
    const styles = style(colors);
    const spcingHeight = Error_ButtonName == "" ? true : false

    return (
        <View style={{ flex: 1, justifyContent: "flex-start", marginTop: Error_Status ? 0 : View_Spacing.VS_H5 }}>

            <View style={{ marginTop: View_Spacing.VS_H5 }} />

            <Image
                defaultSource={Error_Image ?? Icon.emptyOrder}
                source={Error_Image ?? Icon.emptyOrder} resizeMode={'contain'} style={{ height: 80, width: 80, marginVertical: 20, tintColor: palette.orange, alignSelf: "center", tintColor: colors.green }} />

            <View style={{ marginTop: View_Spacing.VS_H2 }} />

            <CTText
                text={Error_Title}
                textColor={colors.grey}
                semiBold
                fontSize={RFValue(13)}
                style={{ textAlign: 'center' }}
            />
            <View style={{ marginTop: View_Spacing.VS_H2 }} />

            {Error_Message == "" ?
                <View style={{ marginTop: View_Spacing.VS_H1 }} />
                :
                <CTText
                    text={Error_Message}
                    semiBold
                    fontSize={RFValue(13)}
                    textColor={colors.grey}
                    style={{ textAlign: 'center' }}
                />
            }

            {Error_ButtonName != "" && (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ marginTop: View_Spacing.VS_H5 }} />
                    <CTButton
                        containerStyle={{ width: '45%', backgroundColor: palette.green, height: View_Spacing.VS_H5, paddingVertical: 0 }}
                        fontSize={RFValue(13)}
                        textColor={palette.white}
                        text={Error_ButtonName}
                        onPress={Error_Method}
                    />
                </View>
            )}

            <View style={{ marginTop: View_Spacing.VS_H2 }} />

        </View>

    );
};
export default Errordisplaycomponent;

const style = props =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 5
        },
        warning: {
            width: width / 100 * 15,
            height: width / 100 * 15,
            resizeMode: "contain",
            alignSelf: "center"
        },
    });
