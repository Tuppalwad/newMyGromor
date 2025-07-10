import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import CustomButton from '../../component/common/CustomButton';
import colors from '../../utils/theam';
import leftArrow from '../../assets/images/splash/leftArrow.png';
import message from '../../assets/images/splash/message.png'
import Timer from '../../assets/images/splash/timer.png'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { postLogin, resendOTP, verify } from '../../services/auth/authApi';
import messaging from '@react-native-firebase/messaging';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Clipboard from '@react-native-clipboard/clipboard';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { getVersion } from 'react-native-device-info';
import { HEToast } from '../../component/common/HEToast';

export default function VerifyOtp() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [notificationCode, setNotificationCode] = useState('');
    const [latlong, setLatlong] = useState({ latitude: 0, longitude: 0 });
    const [intervalId, setIntervalId] = useState(null);
    const [timer, setTimer] = useState(null);

    const inputRefs = useRef([]);
    const navigation = useNavigation();
    const { phoneNumber, clsificationCode } = useRoute()?.params;
    const dispatch = useDispatch();
    const { selectedLanguage } = useSelector((state) => state.language);
    const isFocused = useIsFocused();

    const isIOS = Platform.OS === 'ios';

    useEffect(() => {
        startTimer();
        fetchLocation(); // 🔐 Fetch location on load
    }, []);

    useEffect(() => {
        messaging()
            .getToken()
            .then((token) => {
                setNotificationCode(token);
            });
    }, [isFocused]);

    useEffect(() => {
        const interval = setInterval(async () => {
            const text = await Clipboard.getString();
            const match = text.match(/^\d{4}$/);
            if (match) setOtp(match[0].split(''));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const startTimer = () => {
        if (intervalId) clearInterval(intervalId);
        let time = 91;
        const newInterval = setInterval(() => {
            if (time === 0) {
                clearInterval(newInterval);
                setIntervalId(null);
                setTimer(null);
            } else {
                time--;
                setTimer(time);
            }
        }, 1000);
        setIntervalId(newInterval);
    };

    const fetchLocation = async () => {
        try {
            const permission = await request(
                isIOS
                    ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            );

            if (permission === RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    (pos) => {
                        const { latitude, longitude } = pos.coords;
                        console.log('📍 Location:', latitude, longitude);
                        setLatlong({ latitude, longitude });
                    },
                    (error) => {
                        console.log('❌ Geolocation error:', error);
                        HEToast('Unable to get location');
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            } else {
                console.log('❌ Location permission denied');
                HEToast('Location permission denied');
            }
        } catch (err) {
            console.log('❌ Permission request error:', err);
            HEToast('Error requesting location permission');
        }
    };

    const handleResendOtp = async () => {
        try {
            const res = await dispatch(resendOTP({ mobile: phoneNumber }));
            if (res.status === 200) {
                setOtp(['', '', '', '']);
                startTimer();
            }
        } catch (error) {
            console.log('Resend OTP Error:', error);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const data = {
                mobile: phoneNumber,
                otp: otp.join(''),
                platform: isIOS ? 'IOS' : 'ANDROID',
                version: getVersion() ?? '',
                token: notificationCode,
                selectedLanguage,
            };

            const res = await dispatch(verify(data));

            if (res.status === 200) {
                const Otp_Response = res?.data ?? {};

                // Wait until location is set if still 0,0
                if (latlong.latitude === 0 && latlong.longitude === 0) {
                    console.log('⌛ Waiting for location...');
                    await new Promise((resolve) => {
                        const waitInterval = setInterval(() => {
                            if (latlong.latitude !== 0 && latlong.longitude !== 0) {
                                clearInterval(waitInterval);
                                resolve();
                            }
                        }, 500);
                    });
                }

                const postData = {
                    mobileNumber: phoneNumber,
                    farmerIdentityId: Otp_Response?.id ?? '',
                    classificationCode: clsificationCode ?? '',
                    latitude: latlong.latitude,
                    longitude: latlong.longitude,
                    loginFrom: isIOS ? 'IOS' : 'ANDROID',
                };

                const loginRes = await dispatch(postLogin(postData));
                if (loginRes.status === 200) {
                    navigation.navigate('Home');
                } else {
                    HEToast(loginRes?.message ?? 'Login failed');
                }
            }
        } catch (error) {
            console.log('OTP Verification Error:', error);
            HEToast('OTP verification failed');
        }
    };

    const onPressBack = () => {
        if (!timer) {
            navigation.goBack();
        } else {
            HEToast(`Can't go back. Please wait for ${timer}s`);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                {/* Top Bar */}
                <View style={styles.topSection}>
                    <TouchableOpacity onPress={onPressBack}>
                        <Image source={leftArrow} style={styles.lefticon} />
                    </TouchableOpacity>
                    <Image source={message} style={styles.Chaticon} />
                    <View />
                </View>

                {/* Title */}
                <Text style={styles.title}>Verify OTP</Text>
                <Text style={styles.subtitle}>Enter OTP that we sent to</Text>
                <Text style={styles.phoneNumber}>{'xxxxxx' + phoneNumber.toString().substr(6, 11)}</Text>

                {/* OTP Input */}
                <OTPInputView
                    style={styles.otpContainer}
                    pinCount={4}
                    autoFocusOnLoad={false}
                    code={otp.join('')}
                    onCodeChanged={(code) => setOtp(code.split(''))}
                    codeInputFieldStyle={styles.otpInput}
                    codeInputHighlightStyle={styles.otpInputActive}
                />

                {/* Verify Button */}
                <CustomButton title="Verify OTP" onPress={handleVerifyOtp} style={styles.verifyButton} />

                {/* Timer and Resend */}
                <View style={styles.bottomRow}>
                    <View style={styles.timerRow}>
                        <Image source={Timer} style={styles.timerIcon} />
                        <Text style={styles.timerText}>{timer} Sec</Text>
                    </View>
                    <TouchableOpacity onPress={handleResendOtp}>
                        <Text style={styles.resendText}>Re-Send OTP</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Footer */}
            <Text style={styles.footerText}>©2025 MyGromor | Version 1.0</Text>
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
    // otpContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     marginBottom: 30,
    // },
    // otpInput: {
    //     width: 60,
    //     height: 55,
    //     borderWidth: 1,
    //     borderColor: colors.primary,
    //     borderRadius: 6,
    //     textAlign: 'center',
    //     fontSize: 18,
    //     color: '#333',
    // },


    otpContainer: {
        width: '80%',
        height: 100,
        alignSelf: 'center',
    },
    otpInput: {
        width: 45,
        height: 55,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        color: '#000',
        fontSize: 20,
    },
    otpInputActive: {
        borderColor: '#6200ee',
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
