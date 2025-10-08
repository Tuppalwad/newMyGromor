// src/pages/LanguageScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import CustomButton from '../../../components/common/CustomButton';
import CustomRadioButton from '../../../components/common/CustomRadioButton';
import { languages } from '../../../utils/data';
import colors from '../../../utils/theam';
import { Screen } from '../../../router/screen';
import { UserManager } from '../../../storage';
import { useOperation } from '../../../redux/operation';
import { useDispatch, useSelector } from 'react-redux';
import { createLoadingSelector } from '../../../redux/loading-reducer';
import { useIsFocused } from '@react-navigation/native';
import { UserType } from '../../../redux/user/type';
import { FarmerType } from '../../../redux/farmer/type';
import Indicator from '../../../components/common/Indicator';
import CustomHeader from '../../../components/common/CustomHeader';
// import { Image } from 'react-native-reanimated/lib/typescript/Animated';
import language from '../../../assets/images/common/language.png';

const NewLanguageScreen = ({ navigation }) => {

    const operation = useOperation();
    const dispatch = useDispatch();
    const loadingSelector = createLoadingSelector([UserType.appLanguage, UserType.userMultilingualLanguage]);
    const isLoading = useSelector(state => loadingSelector(state));
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [selectedLanguageData, setSelectedLanguageData] = useState(null)
    const languageList = useSelector((state) => state.user.appLanguage);
    const isFocussed = useIsFocused();
    const appLanguage = UserManager?.getAppMultiLanguage
    console.log(selectedLanguage)
    useEffect(() => {
        if (isFocussed) {
            dispatch(operation.user.getAppLanguage());
        }
    }, [isFocussed]);


    useEffect(() => {
        setSelectedLanguage(languageList[0]);
        setSelectedLanguageData(languageList[0]);
    }, [languageList])


    const handlePress = () => {
        dispatch(
            operation.user.getAppMultiLanguage({
                language: selectedLanguage?.id ?? 1,
            })
        )
            .then((res) => {
                if (UserManager.isLoggedIn) {
                    navigation.navigate(Screen.homes, {
                        selectedLanguage: selectedLanguageData,
                        selectedLanguageResponse: res,
                    });
                } else {
                    navigation.navigate(Screen.login, {
                        selectedLanguage: selectedLanguageData,
                        selectedLanguageResponse: res,
                    });
                }
            })
            .catch((err) => {
                dispatch(
                    operation.user.getErrorHandling(err, "getAppMultiLanguage")
                );
            });
    };


    return (
        <>
            <CustomHeader
                type="Language"
                topTitle="Select Language"
                subtitle=""
                onBackPress={() => navigation.goBack()}
                onCartPress={() => console.log('Order pressed')}
                onNotificationPress={() => console.log('Notification pressed')}
            />
            <View style={styles.container}>
                <View style={styles.subBox}>
                    <Image source={language}
                        style={{ width: 80, height: 80, resizeMode: 'contain', }} />
                    <Text style={styles.subtitle}>Choose your preferred language for a personalized experience.</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={languageList || []}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        contentContainerStyle={styles.list}
                        renderItem={({ item }) => (
                            <CustomRadioButton
                                selected={selectedLanguage?.id === item.id}
                                label={item.label}
                                subLabel={item.language}
                                onPress={() => setSelectedLanguage(item)}

                            />
                        )}
                    />
                </View>


            </View>
            <CustomButton
                title={`Update Language${selectedLanguage ? ` (${selectedLanguage.label})` : ''}`}
                onPress={handlePress}
                style={styles.button}
                disabled={!selectedLanguage}
            />
            <Indicator show={isLoading} />
        </>
    );
};

export default NewLanguageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 24,
        // backgroundColor: '#ffffffb8',
    },
    subBox: {
        width: '100%',
        height: 'auto',
        marginTop: 10,
        //   marginBottom: 10, 
        marginHorizontal: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    title: {
        marginTop: 40,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.textPrimary,
        marginBottom: 8,
    },
    subtitle: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '500',
        color: '#777',
        textAlign: 'center',
        marginBottom: 20,
    },
    list: {
        paddingBottom: 30,
    },
    button: {
        marginTop: 20,
    },
});
