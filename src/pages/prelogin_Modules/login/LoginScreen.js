// src/screens/LoginScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import Logo from '../../../assets/images/splash/logo.png'
import CustomLoginRadioButton from '../../../components/CustomLoginRadioButton';
import CustomButton from '../../../components/common/CustomButton';
import colors from '../../../utils/theam';
import Phone from '../../../assets/images/splash/phone.png'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { Screen } from '../../../router/screen';
import { UserManager } from '../../../storage';
import { createLoadingSelector } from '../../../redux/loading-reducer';
import { FarmerType } from '../../../redux/farmer/type';
import { UserType } from '../../../redux/user/type';
import { useDispatch, useSelector } from 'react-redux';
import { useOperation } from '../../../redux/operation';
import { isEmpty, isValidPhone, minLength } from '../../../utils/validator';
import { HEToast } from '../../../components/toast';
import { useForm } from 'react-hook-form';

export default function LoginScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    UserManager.loadAppMultiLangauge();
    const isFocussed = useIsFocused();
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ mode: 'onBlur' });
    const [disableSend, setDisableSend] = useState(true);
    const loadingSelector = createLoadingSelector([
        UserType.generateOTP,
        FarmerType.classificationofFarmer,
        FarmerType.farmerclassificationcode,
    ]);
    const isLoading = useSelector(state => loadingSelector(state));
    const dispatch = useDispatch();
    const operation = useOperation();
    const [mobileNumber, setMobileNumber] = useState('');
    const selectedLanguage = route?.params?.selectedLanguage;
    const selectedLanguageResponse = route?.params?.selectedLanguageResponse;
    const [appLanguage, setAppLanguage] = useState(null);
    const appLanguages = useSelector(state => state.user.appMultiLanguage);
    const cfArrayDetails = useSelector(state => state.farmer.classificationofFarmerArray);
    const [farmerType, setFarmerType] = useState({});

    useEffect(() => {
        if (isFocussed) {
            dispatch(
                operation.farmer.classificationofFarmerAction(
                    selectedLanguage?.id ?? 1,
                ),
            );
        }
    }, [isFocussed]);

    useEffect(() => {
        if (minLength(mobileNumber, 10) && farmerType?.classificationCode) {
            setDisableSend(false);
        } else {
            setDisableSend(true);
        }
    }, [mobileNumber, farmerType]);


    useEffect(() => {
        UserManager.loadAppMultiLangauge().then(res => {
            setAppLanguage(JSON.parse(res));
        });
    }, [appLanguages]);

    useEffect(() => {
        if (mobileNumber?.length == 10) {
            dispatch(operation.farmer.farmerTypeAction(mobileNumber))
                .then(res => {
                    for (let i = 0; i < cfArrayDetails.length; i++) {
                        if (cfArrayDetails[i].classificationCode === res) {
                            setFarmerType(cfArrayDetails[i]);
                        }
                    }
                })
                .catch(err => {
                    dispatch(operation.user.getErrorHandling(err, 'farmerTypeAction'));
                });
        } else {
            setFarmerType({});
        }
    }, [mobileNumber]);



    const onSubmit = () => {

        let param = { mobile: mobileNumber };

        try {
            isValidPhone(
                mobileNumber,
                appLanguage?.valid_number ?? 'Enter Valid Number',
            );
            if (isEmpty(farmerType)) {
                HEToast(appLanguage?.lblSelectWhoIam ?? 'Select Who I am', 'error');
            } else {
                dispatch(operation.user.generateOTP(param))
                    .then(res => {
                        console.log('res_generateOTP', res);
                        if (res.errors == null || res.errors.length === 0) {
                            navigation.navigate(Screen.otpscreen, {
                                mobileNumber: mobileNumber,
                                selectedLanguage: selectedLanguage,
                                classificationCode: farmerType,
                            });
                        } else {
                            // dispatch(operation.user.getErrorHandling(res, 'res_generateOTP'));
                        }
                    })
                    .catch(err => {
                        dispatch(operation.user.getErrorHandling(err, 'generateOTP'));
                    });
            }
        } catch (e) {
            HEToast(e ?? '', 'error');
        }
    };

    const handleSubmitOtp = () => onSubmit();


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
                        value={mobileNumber}  // <-- bind to mobileNumber from logic
                        onChangeText={setMobileNumber}
                        placeholderTextColor={'#999'}
                        maxLength={10}
                    />
                </View>

                {/* Who I am */}
                <View style={styles.sectionLabel}>
                    <Text style={styles.sectionLabelText}>Who I am*</Text>
                </View>

                {/* Radio Buttons */}
                <View style={styles.radioContainer}>
                    {(cfArrayDetails || [])?.map((option) => (
                        <View key={option.classificationCode} style={styles.radioItem}>
                            <CustomLoginRadioButton
                                selected={farmerType?.classificationCode === option.classificationCode}
                                onPress={() => setFarmerType(option)}
                                label={option.name}
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
                <CustomButton title="Login" onPress={handleSubmitOtp} disabled={disableSend} />


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
