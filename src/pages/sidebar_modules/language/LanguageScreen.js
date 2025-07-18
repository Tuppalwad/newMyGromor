// src/pages/LanguageScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
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

const LanguageScreen = ({ navigation }) => {

    const operation = useOperation();
    const dispatch = useDispatch();
    const loadingSelector = createLoadingSelector([UserType.appLanguage, UserType.userMultilingualLanguage]);
    const isLoading = useSelector(state => loadingSelector(state));
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [selectedLanguageData, setSelectedLanguageData] = useState(null)
    const languageList = useSelector((state) => state.user.appLanguage);
    const isFocussed = useIsFocused();
    const appLanguage = UserManager?.getAppMultiLanguage

    useEffect(() => {
        if (isFocussed) {
            dispatch(operation.user.getAppLanguage());
            // createChannels()
        }
    }, [isFocussed]);


    useEffect(() => {
        setSelectedLanguage(languageList[0]);
        setSelectedLanguageData(languageList[0]);
    }, [languageList])


    const handlePress = () => {
        dispatch(operation.user.getAppMultiLanguage({
            language: selectedLanguageData?.id ?? 1
        })).then((res) => {
            navigation.navigate(Screen.login, {
                selectedLanguage: selectedLanguageData,
                selectedLanguageResponse: res,
            })
        }).catch((err) => {
            dispatch(operation.user.getErrorHandling(err, "getAppMultiLanguage"))
        })
    }

    // const createChannels = () => {
    //     PushNotification.createChannel({
    //         channelId: "my-gromor",
    //         channelName: "Gromor Notificaiton Channel"
    //     })
    // }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Language</Text>
            <Text style={styles.subtitle}>Choose your preferred language for a personalized experience.</Text>

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

            <CustomButton
                title="Proceed"
                onPress={handlePress}
                style={styles.button}
                disabled={!selectedLanguage}
            />
            <Indicator show={isLoading} />

        </View>
    );
};

export default LanguageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
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
        fontSize: 14,
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
