import React, { Component } from 'react';
import { View, StyleSheet, Modal, Text, Image, Platform } from 'react-native';
import { Icon } from "../../../assets/images/index"
import { Isplatform_Android, width } from "../../config/resposiveSize"
import { palette } from '../../theme/color';

const Indicator = ({ show, color = palette.green, isSmall = false, Indicator = false }) => {

    let ImageSize = isSmall ? width / 100 * 16 : width / 100 * 20
    return ((Isplatform_Android && !Indicator) ?
        <Modal
            animationType={'none'}
            transparent={true}
            // hardwareAccelerated={true}
            visible={show}>
            <View style={styles.loaderContainer}>
                <View style={isSmall ? styles.loaderViewStyle : styles.loaderCenterViewStyle}>
                    <Image
                        source={Icon.loading_GIF}
                        style={{ width: ImageSize, height: ImageSize }}
                        resizeMode={'contain'}
                    />
                </View>
            </View>
        </Modal>
        :
        (show && <View style={styles.loaderContainer}>
            <View style={isSmall ? styles.loaderViewStyle : styles.loaderCenterViewStyle}>
                <Image
                    source={Icon.loading_GIF}
                    style={{ width: ImageSize, height: ImageSize }}
                    resizeMode={'contain'}
                />
            </View>
        </View>)
    );
};

export default Indicator;


const styles = StyleSheet.create({
    loaderContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderViewStyle: {
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        width: width / 100 * 20,
        height: width / 100 * 20,
        borderRadius: width / 100 * 5,
        shadowColor: palette.white,
        borderColor: palette.buttonYellow,
        borderWidth: 1,
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 8,
        alignItems: 'center',
    },
    loaderCenterViewStyle: {
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        width: width / 100 * 25,
        height: width / 100 * 25,
        borderRadius: width / 100 * 5,
        shadowColor: palette.white,
        borderColor: palette.buttonYellow,
        borderWidth: 1,
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 8,
        alignItems: 'center',
    },
});
