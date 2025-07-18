import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
// import CustomButton from '../components/CustomButton';
import Logo from '../../../assets/images/splash/logo.png';
import Store from '../../../assets/images/welcome/store.png'
import CustomButton from '../../../components/common/CustomButton';
import colors from '../../../utils/theam';
import { Screen } from '../../../router/screen';
import { useOperation } from '../../../redux/operation';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { createLoadingSelector } from '../../../redux/loading-reducer';
import { UserManager } from '../../../storage';
import { getVersion } from 'react-native-device-info';
import { Linking } from 'react-native';
import { Isplatform_IOS } from '../../../config/resposiveSize';
// import PushNotification from "react-native-push-notification";
import { UserType } from '../../../redux/user/type';
// import PushNotification from 'react-native-push-notification';





const WelcomeScreen = ({ navigation }) => {

    const operation = useOperation();
    const dispatch = useDispatch();
    const isFocussed = useIsFocused();
    const [showUpdate, setshowUpdate] = useState({
        visible: false,
        Current_Version: '',
    });
    const loadingSelector = createLoadingSelector([UserType.versionHistory]);
    // const isLoading = useSelector(state => loadingSelector(state));
    const appLanguage = UserManager?.getAppMultiLanguage;

    useEffect(() => {
        if (isFocussed) {
            dispatch(operation.user.getAppLanguage());
            // createChannels()
        }
    }, [isFocussed]);

    // useEffect(() => {
    //     PushNotification.configure({
    //         onRegister: function (token) {
    //             console.log("TOKEN:", token);
    //         },
    //         onNotification: function (notification) {
    //             console.log("NOTIFICATION:", notification);
    //         },
    //         requestPermissions: true, // 👈 request on configure
    //     });

    //     // Create channel (Android only)
    //     PushNotification.createChannel(
    //         {
    //             channelId: "my-gromor",
    //             channelName: "Gromor Notification Channel",
    //         },
    //         (created) => console.log(`createChannel returned '${created}'`)
    //     );
    // }, []);


    useEffect(() => {
        try {
            if (isFocussed) {
                setTimeout(() => {
                    let param = {
                        applicationVersion: getVersion() ?? '',
                        platform: Isplatform_IOS ? 'IOS' : 'ANDROID',
                    };
                    dispatch(operation.user.getVersionHistory(param))
                        .then(res => {
                            if (res?.forceUpdate) {
                                setshowUpdate({
                                    visible: res?.forceUpdate ?? false,
                                    Current_Version: res?.currentVersion ?? '',
                                });
                            } else {
                                getUpdatedUser();
                            }
                        })
                        .catch(err => {
                            getUpdatedUser();
                            dispatch(
                                operation.user.getErrorHandling(err, 'getVersionHistory'),
                            );
                        });
                }, 2000);
            }
        } catch (e) { }
    }, [isFocussed]);

    const getUpdatedUser = () => {
        UserManager.initUser()
            .then(res => {
                if (UserManager.isLoggedIn) {
                    getUserDetails();
                    getAppMultiLangaue();
                    navigation.dispatch(
                        CommonActions.reset({ index: 1, routes: [{ name: Screen.dashboard }] }),
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


    // const createChannels = () => {
    //     PushNotification.createChannel({
    //         channelId: "my-gromor",
    //         channelName: "Gromor Notificaiton Channel"
    //     })
    // }


    return (
        <View style={styles.container}>
            <Image
                source={Logo}
                style={styles.logo}
                resizeMode="contain"
            />

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.subheading}>Trusted by</Text>
                <Text style={styles.subheading}>30,00,000+ Farmers</Text>
            </View>

            <Image
                source={Store} // add your image here
                style={styles.image}
                resizeMode="cover"
            />

            <Text style={styles.description}>
                MyGromor is your One-Stop-Shop for all agricultural needs.
            </Text>

            <CustomButton
                title="Login"
                onPress={() => navigation.navigate(Screen.language)}
                style={styles.button}
                textStyle={{ fontWeight: 'bold' }}
            />
        </View>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 40,
        justifyContent: 'space-between',
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: 40,
    },
    heading: {
        fontSize: 18,
        color: colors.textPrimary,
        marginTop: 24,
    },
    subheading: {
        lineHeight: 20,
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginBottom: 16,
        marginTop: 10
    },
    image: {
        width: '100%',
        height: 249,
        // borderRadius: 16,
        borderBottomRightRadius: 50,
        borderTopLeftRadius: 50,
        marginBottom: 16,
    },
    description: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.textSecondary,
        marginBottom: 24,
    },
    button: {
        width: '100%',
        marginBottom: 30,
    },
});
