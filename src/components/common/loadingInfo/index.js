import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, Text, Image, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import CTText from '../../ctText';
import { UserManager } from '../../../storage';
import { getLoadingInfo,numberFormat } from '../../../utils/utils';
import { isEmpty } from '../../../utils/validator';
import { palette } from '../../../theme/color';
import { height } from '../../../config/resposiveSize';

const LoadingInfo = ({ isLoading = false, aboveButton = false }) => {

    const [APITiming, setAPITiming] = useState({ beforeTime: 0, AfterTime: 0 })
    const [isLoadingTime, setIsLoadingTime] = useState(0)
    const appLanguage = UserManager?.getAppMultiLanguage

    const farmerAddress = useSelector((state) => state.farmer.farmerAddressArray);

    useEffect(() => {
        let temptime = getLoadingInfo(APITiming, isLoading)
        setAPITiming(temptime)
    }, [isLoading])

    useEffect(() => {
        if (!isEmpty(parseInt(APITiming.beforeTime) > 0) && !isEmpty(parseInt(APITiming.AfterTime) > 0)) {
            let finalTime = ((parseInt(APITiming.AfterTime) - parseInt(APITiming.beforeTime))) / 1000
            if ((parseInt(finalTime) < 180) && parseFloat(finalTime) > 0.0) {
                setIsLoadingTime(numberFormat(finalTime))
            }
        }
    }, [APITiming])


    return (
        <View style={aboveButton ? styles.offer : styles.offerBottom}>
            {farmerAddress?.features?.showLoadingTime && (
                <CTText
                    text={`${appLanguage.lblLoadingInfo ?? 'Loading Info'} : ${isLoadingTime} ${"sec"}`}
                    style={{ fontSize: RFValue(10.5), textAlign: "center" }}
                    textColor={palette.white} semiBold />
            )}
        </View>
    );
};

export default LoadingInfo;


const styles = StyleSheet.create({
    offer: {
        backgroundColor: palette.darkOrange,
        paddingHorizontal: height / 100 * 2,
        position: 'absolute',
        bottom: height / 100 * 5.5,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 8
    },
    offerBottom: {
        backgroundColor: palette.darkOrange,
        paddingHorizontal: height / 100 * 2,
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 8
    },
});
