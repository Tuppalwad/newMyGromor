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
import { CommonActions, useIsFocused } from '@react-navigation/native';
import { UserType } from '../../../redux/user/type';
import { FarmerType } from '../../../redux/farmer/type';
import Indicator from '../../../components/common/Indicator';
import CustomHeader from '../../../components/common/CustomHeader';
import language from '../../../assets/images/common/language.png';

const UpdateLanguage = ({ navigation }) => {

    const operation = useOperation();
    const dispatch = useDispatch();
    const loadingSelector = createLoadingSelector([UserType.appLanguage, UserType.userMultilingualLanguage]);
    const isLoading = useSelector(state => loadingSelector(state));
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [selectedLanguageData, setSelectedLanguageData] = useState(null)
    const languageList = useSelector((state) => state.user.appLanguage);
    const isFocussed = useIsFocused();
    const farmerAddress = useSelector((state) => state.farmer.farmerAddressArray);
    const farmerLanguage = useSelector((state) => state.farmer.FarmerLanguageID);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (isFocussed) {
            dispatch(operation.user.getAppLanguage());
        }
    }, [isFocussed]);


    useEffect(() => {
        if (languageList) {
            languageList.map((item, index) => {
                if (item?.id === farmerLanguage) {
                    setSelectedLanguageData(item)
                }
            })
        }
    }, [languageList])


    const handlePress = () => {
        try {
            setLoading(true)

            let param = {
                id: farmerAddress.farmerIdentityId,
                language: selectedLanguageData?.id
            }
            dispatch(operation.user.userLaguageUpdate(param)).then((res) => {
                let data = {
                    ...UserManager.user,
                    language: selectedLanguageData?.language,
                    languageId: selectedLanguageData?.id,
                    languageCharacter: selectedLanguageData?.character,
                }
                UserManager.saveUser(data)
                UserManager.loadUser()

                setTimeout(() => {
                    dispatch(
                        operation.user.getAppMultiLanguage({
                            language: selectedLanguageData?.id ?? 1,
                        })
                    )
                        .then((res) => {

                            if (!UserManager.isLoggedIn) {
                                return navigation.dispatch(CommonActions.reset({ index: 1, routes: [{ name: Screen.login }] }))
                            } else {
                                navigation.dispatch(CommonActions.reset({ index: 1, routes: [{ name: Screen.homes, }] }))
                            }
                        })
                        .catch((err) => {
                            dispatch(
                                operation.user.getErrorHandling(err, "getAppMultiLanguage")
                            );
                        });
                }, 1000);
            }).catch((err) => {
                dispatch(operation.user.getErrorHandling(err, ""))
            })
        } catch (error) {
            setLoading(false)
        }
        finally {
            // setLoading(false)
        }

    }


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
                <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 10, padding: 20, borderRadius: 8 }}>
                    <FlatList
                        data={languageList || []}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        contentContainerStyle={styles.list}
                        renderItem={({ item }) => (
                            <CustomRadioButton
                                selected={selectedLanguageData?.id === item.id}
                                label={item.label}
                                subLabel={item.language}
                                onPress={() => setSelectedLanguageData(item)}

                            />
                        )}
                    />
                </View>

            </View>
            <CustomButton
                title={`Update Language${selectedLanguageData ? ` (${selectedLanguageData.label})` : ''}`}
                onPress={handlePress}
                style={styles.button}
                disabled={!selectedLanguageData}
            />
            <Indicator show={loading} />
        </>
    );
};

export default UpdateLanguage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10
        // padding: 24,
        // backgroundColor: '#ffffffb8',
    },
    subBox: {
        width: '100%',
        height: 'auto',
        marginTop: 10,
        borderRadius: 8,
        //   marginBottom: 10, 
        // marginHorizontal: 10,
        padding: 15,
        paddingHorizontal: 10,
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
