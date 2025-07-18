
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Animated,
    Dimensions,
    Linking,
} from 'react-native';
import { CommonActions, useIsFocused, useNavigation } from '@react-navigation/native'; // 🔁 ADD THIS

import Logo from '../../../assets/images/splash/logo.png';
import Tree from '../../../assets/images/splash/tree.jpg';
import Brand from '../../../assets/images/splash/brand.png';
import { Screen } from '../../../router/screen';
import { useOperation } from '../../../redux/operation';
import { useDispatch, useSelector } from 'react-redux';
import { createLoadingSelector } from '../../../redux/loading-reducer';
import { UserManager } from '../../../storage';
import { getVersion } from 'react-native-device-info';
import { Isplatform_IOS } from '../../../config/resposiveSize';
import { UserType } from '../../../redux/user/type';
import Constants from '../../../config/constants';
import CustomPopupModal from '../../../components/common/CustomPopupModal';
import CTText from '../../../components/ctText';
import { Icon } from '../../../../assets/images';
import Indicator from '../../../components/common/Indicator';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
    const logoTranslateY = useRef(new Animated.Value(0)).current;
    const treeScale = useRef(new Animated.Value(1.6)).current;
    const treeOpacity = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    const [showBrand, setShowBrand] = useState(true); // initially show brand

    useEffect(() => {
        setTimeout(() => {
            setShowBrand(false); // hide brand when animation starts

            Animated.parallel([
                Animated.timing(logoTranslateY, {
                    toValue: -height * 0.33,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(treeOpacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(treeScale, {
                    toValue: 1.0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // navigation.replace(Screen.welcome);
                checkVersionAndNavigate();
            });
        }, 1000);
    }, []);

    const operation = useOperation();
    const dispatch = useDispatch();
    const isFocussed = useIsFocused();
    const [showUpdate, setshowUpdate] = useState({
        visible: false,
        Current_Version: '',
    });
    const loadingSelector = createLoadingSelector([UserType.versionHistory]);
    const isLoading = useSelector(state => loadingSelector(state));
    const appLanguage = UserManager?.getAppMultiLanguage;

    const checkVersionAndNavigate = () => {
        let param = {
            applicationVersion: getVersion() ?? '',
            platform: Isplatform_IOS ? 'IOS' : 'ANDROID',
        };

        dispatch(operation.user.getVersionHistory(param))
            .then(res => {
                // if (res?.forceUpdate) {
                //     setshowUpdate({
                //         visible: res?.forceUpdate ?? false,
                //         Current_Version: res?.currentVersion ?? '',
                //     });
                // } else {
                //     getUpdatedUser();
                // }
                getUpdatedUser();

            })
            .catch(err => {
                getUpdatedUser();
                dispatch(operation.user.getErrorHandling(err, 'getVersionHistory'));
            });
    };


    const getUpdatedUser = () => {
        UserManager.initUser()
            .then(res => {
                if (UserManager.isLoggedIn) {
                    getUserDetails();
                    getAppMultiLangaue();
                    navigation.dispatch(
                        CommonActions.reset({ index: 1, routes: [{ name: Screen.homes }] }),
                    );
                } else {
                    navigation.dispatch(
                        CommonActions.reset({ index: 1, routes: [{ name: Screen.welcome }] }),
                    );
                }
            })
            .catch(err => {
                navigation.dispatch(
                    CommonActions.reset({ index: 1, routes: [{ name: Screen.welcome }] }),
                );
            });
    };

    const getUserDetails = () => {
        let parms = { farmerIdentityId: UserManager.getUserId };
        let param = {
            userId: UserManager.getUserId,
            token: UserManager.getFcmToken,
        };
        dispatch(operation.user.notificationSend(param));
        dispatch(operation.user.getFarmerDetails(parms));
    };

    const getAppMultiLangaue = () => {
        let parms = { language: UserManager.getUserLanguage ?? 1 };
        dispatch(operation.user.getAppMultiLanguage(parms));
    };

    const onPressDone = () => {
        Linking.openURL(Isplatform_IOS ? Constants.ios : Constants.android);
    };


    return (
        <View style={styles.container}>
            <Animated.Image
                source={Tree}
                style={[
                    styles.tree,
                    {
                        opacity: treeOpacity,
                        transform: [{ scale: treeScale }],
                    },
                ]}
                resizeMode="cover"
            />
            <Animated.Image
                source={Logo}
                style={[
                    styles.logo,
                    {
                        transform: [{ translateY: logoTranslateY }],
                    },
                ]}
                resizeMode="contain"
            />
            {showBrand && (
                <Image source={Brand} style={styles.brand} resizeMode="contain" />
            )}

            <CustomPopupModal
                visible={showUpdate?.visible ?? false}
                icon={Icon.warning}
                isRed={true}
                marginTop_Status={true}
                title={
                    (appLanguage?.lblNewVersiondetected ?? 'New Version detected') +
                    '- V' +
                    showUpdate?.Current_Version
                }
                onPressDone={onPressDone}
                buttonText={appLanguage?.okay ?? 'Okay'}
                bottomDescription={
                    (appLanguage?.lblCurrentAppVersion ?? 'Current App Version') +
                    ' - V' +
                    getVersion()
                }>
                <View style={{ justifyContent: 'center', padding: 10 }}>
                    <CTText
                        text={
                            appLanguage?.lblAnupdateavailable ??
                            'An update is available. Please update your app to continue using it.'
                        }
                        semiBold
                        textColor={'#555555'}
                        style={{ textAlign: 'center' }}
                    />
                </View>
            </CustomPopupModal>
            <Indicator show={isLoading} />

        </View>
    );
};


export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        zIndex: 2,
    },
    tree: {
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        zIndex: 1,
    },
    brand: {
        position: 'absolute',
        bottom: 20,
        width: 150,
        height: 40,
        zIndex: 3,
    },
});
