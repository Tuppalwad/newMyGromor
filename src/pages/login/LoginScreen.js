// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import Logo from '../../assets/images/splash/logo.png'
import CustomLoginRadioButton from '../../component/CustomLoginRadioButton';
import CustomButton from '../../component/common/CustomButton';
import colors from '../../utils/theam';
import Phone from '../../assets/images/splash/phone.png'
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const navigation = useNavigation();
    const options = ['Farmer', 'Dealer/Trader', 'Home Gardner', 'Others'];

    const handleLogin = () => {
        console.log('Phone:', phoneNumber);
        console.log('Role:', selectedOption);

        navigation.navigate('VerifyOtp');

    };


    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Logo */}
                <Image source={Logo} style={styles.logo} />

                {/* Welcome */}
                <Text style={styles.welcome}>Welcome Back!</Text>

                {/* Phone Number */}
                <View style={styles.inputBox}>
                    <Image source={Phone} style={styles.phone} resizeMode='contain' />
                    <TextInput
                        placeholder="Mobile Number"
                        keyboardType="phone-pad"
                        style={styles.input}
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                </View>

                {/* Who I am */}
                <View style={styles.sectionLabel}>
                    <Text style={styles.sectionLabelText}>Who I am*</Text>
                </View>

                {/* Radio Buttons */}
                <View style={styles.radioContainer}>
                    {options.map((option) => (
                        <View key={option} style={styles.radioItem}>
                            <CustomLoginRadioButton
                                selected={selectedOption === option}
                                onPress={() => setSelectedOption(option)}
                                label={option}
                            />
                        </View>
                    ))}
                </View>

            </ScrollView>

            {/* Login Button at Bottom */}
            <View style={styles.footer}>

                {/* Terms */}
                <Text style={styles.termsText}>
                    By logging in, I accept the MyGromor <Text style={styles.link}>Terms & Conditions</Text> and <Text style={styles.link}>Privacy Policy</Text>.
                </Text>
                <CustomButton title="Login →" onPress={handleLogin} />
                <Text style={styles.text}>©2025 MyGromor | Version 1.0 </Text>
            </View>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 30,
        marginTop: 60,  // More margin from top
        resizeMode: 'contain',
    },
    welcome: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 24,
    },
    phone: {
        // marginTop: 10,
        height: 20,
        width: 20
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 20,

    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        marginLeft: 10
    },
    sectionLabel: {
        backgroundColor: '#f2faf2',
        alignSelf: 'center',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginBottom: 16,
        width: "100%",
        justifyContent: "center",
        alignItems: 'center'
    },
    sectionLabelText: {
        paddingVertical: 4,
        lineHeight: 20,
        fontSize: 14,
        fontWeight: 'bold',
        fontWeight: 600,
        color: '#333',
    },
    radioContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24
    },
    radioItem: {
        width: '45%',
    },
    termsText: {

        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 19.5
    },
    link: {
        color: colors.primary,
        fontWeight: '500'
    },
    footer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#fff',
    },
    text: {
        textAlign: 'center',
        lineHeight: 10,
        paddingVertical: 10,
        color: '#878787',
        fontSize: 10
    }
});
