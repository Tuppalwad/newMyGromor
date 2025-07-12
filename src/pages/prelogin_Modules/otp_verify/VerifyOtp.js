import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../../../components/common/CustomButton';
import colors from '../../../utils/theam';
import leftArrow from '../../../assets/images/splash/leftArrow.png';
import message from '../../../assets/images/splash/message.png'
import timer from '../../../assets/images/splash/timer.png'
import { useNavigation } from '@react-navigation/native';


export default function VerifyOtp() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const navigation = useNavigation();
    const handleOtpChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleResendOtp = () => {
        console.log('Resend OTP clicked');
    };

    const handleVerifyOtp = () => {
        console.log('OTP:', otp.join(''));
        navigation.navigate('Home')
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                {/* Back arrow and icon */}
                <View style={styles.topSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        {/* <Text style={styles.backArrow}>{'<'}</Text> */}
                        <Image source={leftArrow} style={styles.lefticon} />
                    </TouchableOpacity>
                    <Image source={message} style={styles.Chaticon} />
                    <View></View>
                </View>

                {/* Heading */}
                <Text style={styles.title}>Verify OTP</Text>
                <Text style={styles.subtitle}>Enter OTP that we sent to</Text>
                <Text style={styles.phoneNumber}>xxxxxx0956</Text>

                {/* OTP Inputs */}
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                            style={styles.otpInput}
                            keyboardType="number-pad"
                            maxLength={1}
                            value={digit}
                            onChangeText={(text) => handleOtpChange(text, index)}
                        />
                    ))}
                </View>

                {/* Verify OTP Button */}
                <CustomButton title="Verify OTP" onPress={handleVerifyOtp} style={styles.verifyButton} />

                {/* Timer and Resend */}
                <View style={styles.bottomRow}>
                    <View style={styles.timerRow}>
                        <Image source={timer} style={styles.timerIcon} />
                        <Text style={styles.timerText}>21 Sec</Text>
                    </View>
                    <TouchableOpacity onPress={handleResendOtp}>
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
