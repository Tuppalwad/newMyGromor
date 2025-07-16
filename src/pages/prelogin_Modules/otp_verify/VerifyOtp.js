// import React, { useState, useRef } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import CustomButton from '../../../components/common/CustomButton';
// import colors from '../../../utils/theam';
// import leftArrow from '../../../assets/images/splash/leftArrow.png';
// import message from '../../../assets/images/splash/message.png'
// import timer from '../../../assets/images/splash/timer.png'
// import { useNavigation } from '@react-navigation/native';
// import OTPInputView from '@twotalltotems/react-native-otp-input';


// export default function VerifyOtp() {
//     // const [otp, setOtp] = useState(['', '', '', '']);
//     // const inputRefs = useRef([]);
//     // const navigation = useNavigation();
//     // const handleOtpChange = (text, index) => {
//     //     const newOtp = [...otp];
//     //     newOtp[index] = text;
//     //     setOtp(newOtp);

//     //     if (text && index < otp.length - 1) {
//     //         inputRefs.current[index + 1].focus();
//     //     }
//     // };

//     // const handleResendOtp = () => {
//     //     console.log('Resend OTP clicked');
//     // };

//     // const handleVerifyOtp = () => {
//     //     console.log('OTP:', otp.join(''));
//     //     navigation.navigate('Home')
//     // };



//     const appLanguage = UserManager?.getAppMultiLanguage
//     const [code, setCode] = useState("");
//     const { mobileNumber } = route?.params;
//     const { selectedLanguage } = route?.params;
//     const { classificationCode } = route?.params?.classificationCode ?? "";
//     const loadingSelector = createLoadingSelector([UserType.verifyOTP, UserType.resendOTP, FarmerType.farmerAddress]);
//     const isLoading = useSelector(state => loadingSelector(state));
//     const isFocussed = useIsFocused();
//     const dispatch = useDispatch();
//     const operation = useOperation();
//     const [timer, setTimer] = useState(null);
//     const [intervalId, setIntervalId] = useState(null);
//     const [notificationCode, setNotificationCode] = useState("");
//     const [latlong, setLatlong] = useState({ "latitude": 0, "longitude": 0 });

//     useEffect(() => {
//         startTimer()
//     }, [])

//     async function requestPermissions() {
//         if (Isplatform_IOS) {
//             const auth = await Geolocation.requestAuthorization("whenInUse")
//             getCurrentLocation();
//         } else {
//             requestLocationPermission();
//         }
//     }

//     useEffect(() => {
//         if (isFocussed) {
//             requestPermissions()
//         }
//     }, [isFocussed])

//     const requestLocationPermission = async () => {
//         if (Isplatform_IOS) {
//             getCurrentLocation();
//         } else {
//             try {
//                 const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//                     {
//                         title: appLanguage?.lblLocationAccessRequired ?? 'Location Access Required',
//                         message: appLanguage?.lblThisAppneedscurrent ?? 'This App needs to Access your current location',
//                         buttonNegative: appLanguage?.cancel ?? "Cancel",
//                         buttonPositive: appLanguage?.lblOk ?? "OK"
//                     },
//                 );
//                 if (granted === RESULTS.GRANTED) {
//                     getCurrentLocation();
//                 } else {
//                     HEToast(appLanguage?.lblAuthorization ?? "Location access is denied")
//                 }
//             } catch (err) {
//                 HEToast(appLanguage?.lblLocationservice ?? "Location service is disabled or unavailable")
//             }
//         }
//     };

//     const getCurrentLocation = () => {
//         Geolocation.getCurrentPosition(
//             (position) => {
//                 let userLocation = { latitude: position.coords?.latitude, longitude: position.coords?.longitude }
//                 UserManager.saveLocation(userLocation)
//                 setLatlong(userLocation)
//             },
//             (error) => {
//                 const { code, message } = error;
//                 if (code === 'CANCELLED') {
//                     HEToast(appLanguage?.lblLocationcancelled ?? "Location cancelled by user or by another request")
//                 }
//                 if (code === 'UNAVAILABLE') {
//                     HEToast(appLanguage?.lblLocationservice ?? "Location service is disabled or unavailable")
//                 }
//                 if (code === 'TIMEOUT') {
//                     HEToast(appLanguage?.lblLocationrequest ?? "Location request timed out")
//                 }
//                 if (code === 'UNAUTHORIZED') {
//                     HEToast(appLanguage?.lblAuthorization ?? "Location access is denied")
//                 }
//             },
//             { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//         );
//     }

//     useEffect(() => {
//         messaging().getToken().then((token => {
//             setNotificationCode(token)
//         }));
//     }, [isFocussed])


//     const otpChangeText = (text) => {
//         setCode(text);
//     };

//     const handleEdit = () => {
//         navigation.navigate(Screen.login)
//     };

//     const handleResend = () => {
//         let param = { mobile: mobileNumber };
//         dispatch(operation.user.resendOTP(param)).then((res) => {
//             startTimer()
//             HEToast(appLanguage?.otp_sent_successfully ?? 'OTP sent successfully', 'success')
//         }).catch((err) => {
//             dispatch(operation.user.getErrorHandling(err, "handleResend"))
//         })
//     };

//     const handleSubmit = () => {
//         if (isEmpty(code) || code?.length < 4) {
//             HEToast(appLanguage?.otp_sent_please ?? 'Please enter OTP sent to your registered mobile number', 'error')
//             return
//         }

//         let param = {
//             "mobile": mobileNumber,
//             "otp": code,
//             "platform": Isplatform_IOS ? "IOS" : "ANDROID",
//             "version": getVersion() ?? "",
//             "token": notificationCode,
//             selectedLanguage: selectedLanguage,
//         };

//         dispatch(operation.user.verifyOTP(param)).then((res) => {
//             let Otp_Response = res?.data ?? {}
//             if (!isEmpty(Otp_Response?.id)) {
//                 dispatch(operation.farmer.getFarmerpostLogin({
//                     "mobileNumber": param.mobile,
//                     "farmerIdentityId": Otp_Response?.id ?? "",
//                     "classificationCode": classificationCode,
//                     "latitude": latlong.latitude ?? 0,
//                     "longitude": latlong.longitude ?? 0,
//                     "loginFrom": Isplatform_IOS ? "IOS" : "ANDROID",
//                 })).then((res) => {
//                     let userData = {
//                         ...UserManager.user,
//                         identity: res?.data ?? {}
//                     }
//                     UserManager.updateFcmToken(param.token);
//                     UserManager.saveUser(userData)
//                     navigation.dispatch(
//                         CommonActions.reset({
//                             index: 1, routes: [{ name: Screen.dashboard }],
//                         }),
//                     );
//                 }).catch((err) => {
//                     dispatch(operation.user.getErrorHandling(err, "getFarmerpostLogin"))
//                 })
//             } else {
//                 dispatch(operation.user.getErrorHandling("Invalid Identifer for Farmer", "InvalidFarmerpostLogin"))
//             }
//         }).catch((err) => {
//             dispatch(operation.user.getErrorHandling(err, "verifyOTP"))
//         })

//     };

//     const startTimer = () => {
//         if (intervalId) clearInterval(intervalId);
//         let time = 91;
//         const interval = setInterval(() => {
//             if (time === 0) {
//                 setTimer(null);
//                 clearInterval(interval);
//                 setIntervalId(null);
//             } else {
//                 time--;
//                 setTimer(time);
//             }
//         }, 1000);
//         setIntervalId(interval);
//     };

//     const onPressBack = () => {
//         if (!timer) {
//             navigation.goBack()
//         } else {
//             HEToast(`${appLanguage?.please_wait ?? 'Can\'t go back. Please wait for'} ${timer}s`)
//         }
//     }

//     return (
//         <View style={styles.container}>
//             <View style={styles.contentContainer}>
//                 {/* Back arrow and icon */}
//                 <View style={styles.topSection}>
//                     <TouchableOpacity onPress={() => navigation.goBack()}>
//                         {/* <Text style={styles.backArrow}>{'<'}</Text> */}
//                         <Image source={leftArrow} style={styles.lefticon} />
//                     </TouchableOpacity>
//                     <Image source={message} style={styles.Chaticon} />
//                     <View></View>
//                 </View>

//                 {/* Heading */}
//                 <Text style={styles.title}>Verify OTP</Text>
//                 <Text style={styles.subtitle}>Enter OTP that we sent to</Text>
//                 <Text style={styles.phoneNumber}>xxxxxx0956</Text>

//                 {/* OTP Inputs */}
//                 <View style={styles.otpContainer}>
//                     {otp.map((digit, index) => (
//                         <TextInput
//                             key={index}
//                             ref={(ref) => (inputRefs.current[index] = ref)}
//                             style={styles.otpInput}
//                             keyboardType="number-pad"
//                             maxLength={1}
//                             value={digit}
//                             onChangeText={(text) => handleOtpChange(text, index)}
//                         />
//                     ))}
//                 </View>

//                 {/* Verify OTP Button */}
//                 <CustomButton title="Verify OTP" onPress={handleVerifyOtp} style={styles.verifyButton} />

//                 {/* Timer and Resend */}
//                 <View style={styles.bottomRow}>
//                     <View style={styles.timerRow}>
//                         <Image source={timer} style={styles.timerIcon} />
//                         <Text style={styles.timerText}>21 Sec</Text>
//                     </View>
//                     <TouchableOpacity onPress={handleResendOtp}>
//                         <Text style={styles.resendText}>Re-Send OTP</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//             <Text style={styles.footerText}>©2025 MyGromor | Version 1.0 </Text>
//         </View>
//     );
// }



import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    AppState
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useFocusEffect, useNavigation, CommonActions, useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import messaging from '@react-native-firebase/messaging';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import CustomButton from '../../../components/common/CustomButton';
import colors from '../../../utils/theam';
import leftArrow from '../../../assets/images/splash/leftArrow.png';
import message from '../../../assets/images/splash/message.png';
import timerIcon from '../../../assets/images/splash/timer.png';
import { Isplatform_IOS } from '../../../config/resposiveSize';
import { createLoadingSelector } from '../../../redux/loading-reducer';
import { useOperation } from '../../../redux/operation';
import { Screen } from '../../../router/screen';
import { UserManager } from '../../../storage';
import { UserType } from '../../../redux/user/type';
import { FarmerType } from '../../../redux/farmer/type';
import { HEToast } from '../../../components/toast';
import { getVersion } from 'react-native-device-info';
import { isEmpty } from 'lodash';

export default function VerifyOtp({ route }) {
    const appLanguage = UserManager?.getAppMultiLanguage;
    const [code, setCode] = useState('');
    const { mobileNumber } = route?.params;
    const { selectedLanguage } = route?.params;
    const classificationCode = route?.params?.classificationCode ?? '';
    const loadingSelector = createLoadingSelector([
        UserType.verifyOTP,
        UserType.resendOTP,
        FarmerType.farmerAddress
    ]);
    const isLoading = useSelector(state => loadingSelector(state));
    const isFocussed = useIsFocused();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const operation = useOperation();
    const [timer, setTimer] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    const [notificationCode, setNotificationCode] = useState('');
    const [latlong, setLatlong] = useState({ latitude: 0, longitude: 0 });

    useEffect(() => {
        startTimer();
        return () => clearInterval(intervalId); // cleanup on unmount
    }, []);


    async function requestPermissions() {
        if (Isplatform_IOS) {
            await Geolocation.requestAuthorization('whenInUse');
            getCurrentLocation();
        } else {
            requestLocationPermission();
        }
    }

    useEffect(() => {
        if (isFocussed) {
            requestPermissions();
        }
    }, [isFocussed]);

    const requestLocationPermission = async () => {
        try {
            const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, {
                title: appLanguage?.lblLocationAccessRequired ?? 'Location Access Required',
                message: appLanguage?.lblThisAppneedscurrent ?? 'This App needs to access your current location',
                buttonNegative: appLanguage?.cancel ?? 'Cancel',
                buttonPositive: appLanguage?.lblOk ?? 'OK'
            });
            if (granted === RESULTS.GRANTED) {
                getCurrentLocation();
            } else {
                HEToast(appLanguage?.lblAuthorization ?? 'Location access is denied');
            }
        } catch (err) {
            HEToast(appLanguage?.lblLocationservice ?? 'Location service is disabled or unavailable');
        }
    };

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                let userLocation = {
                    latitude: position.coords?.latitude,
                    longitude: position.coords?.longitude
                };
                UserManager.saveLocation(userLocation);
                setLatlong(userLocation);
            },
            error => {
                const { code } = error;
                if (code === 'CANCELLED') {
                    HEToast(appLanguage?.lblLocationcancelled ?? 'Location cancelled');
                } else if (code === 'UNAVAILABLE') {
                    HEToast(appLanguage?.lblLocationservice ?? 'Location unavailable');
                } else if (code === 'TIMEOUT') {
                    HEToast(appLanguage?.lblLocationrequest ?? 'Location timed out');
                } else if (code === 'UNAUTHORIZED') {
                    HEToast(appLanguage?.lblAuthorization ?? 'Access denied');
                }
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    // useEffect(() => {
    //     messaging()
    //         .getToken()
    //         .then(token => {
    //             setNotificationCode(token);
    //         });
    // }, [isFocussed]);

    // ✅ Auto-fill OTP from clipboard
    useFocusEffect(
        React.useCallback(() => {
            const checkClipboard = async () => {
                const text = await Clipboard.getString();
                if (/^\d{4}$/.test(text)) {
                    setCode(text);
                }
            };
            checkClipboard();
        }, [])
    );

    const handleResend = () => {
        let param = { mobile: mobileNumber };
        dispatch(operation.user.resendOTP(param))
            .then(res => {
                startTimer();
                HEToast(appLanguage?.otp_sent_successfully ?? 'OTP sent successfully', 'success');
            })
            .catch(err => {
                dispatch(operation.user.getErrorHandling(err, 'handleResend'));
            });
    };

    const handleSubmit = () => {
        if (!code || code.length < 4) {
            HEToast(appLanguage?.otp_sent_please ?? 'Please enter valid OTP', 'error');
            return;
        }

        let param = {
            mobile: mobileNumber,
            otp: code,
            platform: Isplatform_IOS ? 'IOS' : 'ANDROID',
            version: getVersion() ?? '',
            token: notificationCode,
            selectedLanguage: selectedLanguage
        };

        dispatch(operation.user.verifyOTP(param))
            .then(res => {
                let Otp_Response = res?.data ?? {};
                if (!isEmpty(Otp_Response?.id)) {
                    dispatch(
                        operation.farmer.getFarmerpostLogin({
                            mobileNumber: param.mobile,
                            farmerIdentityId: Otp_Response?.id ?? '',
                            classificationCode: classificationCode,
                            latitude: latlong.latitude ?? 0,
                            longitude: latlong.longitude ?? 0,
                            loginFrom: Isplatform_IOS ? 'IOS' : 'ANDROID'
                        })
                    )
                        .then(res => {
                            let userData = {
                                ...UserManager.user,
                                identity: res?.data ?? {}
                            };
                            UserManager.updateFcmToken(param.token);
                            UserManager.saveUser(userData);
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 1,
                                    routes: [{ name: Screen.homes }]
                                })
                            );
                        })
                        .catch(err => {
                            dispatch(operation.user.getErrorHandling(err, 'getFarmerpostLogin'));
                        });
                } else {
                    dispatch(operation.user.getErrorHandling('Invalid Identifier for Farmer', 'InvalidFarmerpostLogin'));
                }
            })
            .catch(err => {
                dispatch(operation.user.getErrorHandling(err, 'verifyOTP'));
            });

        clearInterval(intervalId);
    };

    const startTimer = () => {
        if (intervalId) clearInterval(intervalId);
        let time = 91;
        const interval = setInterval(() => {
            if (time === 0) {
                setTimer(null);
                clearInterval(interval);
                setIntervalId(null);
            } else {
                time--;
                setTimer(time);
            }
        }, 1000);
        setIntervalId(interval);
    };

    const onPressBack = () => {
        if (!timer) {
            navigation.goBack();
        } else {
            HEToast(`${appLanguage?.please_wait ?? "Can't go back. Please wait for"} ${timer}s`);
        }

    };



    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                {/* Back arrow and icon */}
                <View style={styles.topSection}>
                    <TouchableOpacity onPress={onPressBack}>
                        <Image source={leftArrow} style={styles.lefticon} />
                    </TouchableOpacity>
                    <Image source={message} style={styles.Chaticon} />
                    <View></View>
                </View>

                {/* Heading */}
                <Text style={styles.title}>Verify OTP</Text>
                <Text style={styles.subtitle}>Enter OTP that we sent to</Text>
                <Text style={styles.phoneNumber}>{mobileNumber}</Text>

                {/* OTPInputView replaces manual inputs */}
                <OTPInputView
                    style={styles.otpContainer}
                    pinCount={4}
                    code={code}
                    onCodeChanged={text => setCode(text)}
                    // onCodeFilled={handleSubmit}
                    autoFocusOnLoad={false}
                    codeInputFieldStyle={styles.otpInput}
                />

                {/* Verify Button */}
                <CustomButton title="Verify OTP" onPress={handleSubmit} style={styles.verifyButton} />

                {/* Timer and Resend */}
                <View style={styles.bottomRow}>
                    <View style={styles.timerRow}>
                        <Image source={timerIcon} style={styles.timerIcon} />
                        <Text style={styles.timerText}>{timer ? `${timer} Sec` : '00 Sec'}</Text>
                    </View>
                    <TouchableOpacity onPress={handleResend}>
                        <Text style={styles.resendText}>Re-Send OTP</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.footerText}>©2025 MyGromor | Version 1.0 </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    contentContainer: {
        flex: 1,
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    backArrow: {
        fontSize: 24,
        color: '#333',
    },
    lefticon: {
        width: 15,
        height: 15,
        paddingVertical: 10,
        resizeMode: 'contain',
    },
    Chaticon: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
    },
    phoneNumber: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    otpInput: {
        width: 60,
        height: 55,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 6,
        textAlign: 'center',
        fontSize: 18,
        color: '#333',
    },
    verifyButton: {
        marginBottom: 30,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timerRow: {
        lineHeight: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    timerIcon: {
        // fontSize: 16,
        height: 15,
        width: 15,
        marginRight: 4,
    },
    timerText: {
        fontSize: 14,
        color: '#555',
    },
    resendText: {
        fontSize: 14,
        color: colors.primary,
        fontWeight: '600',
        lineHeight: 10
    },
    footerText: {
        textAlign: 'center',
        color: '#878787',
        fontSize: 10,
        paddingVertical: 10,
    }
});
