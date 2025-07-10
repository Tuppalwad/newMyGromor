// src/pages/LanguageScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CustomButton from '../../component/common/CustomButton';
import CustomRadioButton from '../../component/common/CustomRadioButton';
import { languages } from '../../utils/data';
import colors from '../../utils/theam';
import { useDispatch, useSelector } from 'react-redux';
import { getLanguage, getLanguageData } from '../../services/language/languageApi';
import { setSelectedLanguage } from '../../redux/language/action';

const LanguageScreen = ({ navigation }) => {
    const [selectedLang, setSelectedLang] = useState(null);
    const [selectedLangData, setSelectedLangData] = useState(null);
    const dispatch = useDispatch();
    const { language } = useSelector((state) => state.language)

    console.log('LanguageScreen language:', selectedLangData);

    useEffect(() => {
        fetchLanguage()
    }, [])

    useEffect(() => {
        if (language && language.length > 0) {
            const defaultLang = language.find(item => item.isDefault);
            if (defaultLang) {
                setSelectedLang(defaultLang.id);
                setSelectedLangData(defaultLang);
            } else {
                setSelectedLang(language[0].id);
                setSelectedLangData(language[0]);
            }
        }
    }
        , [language]);

    const fetchLanguage = async () => {
        try {
            await dispatch(getLanguage())
        } catch (error) {
            console.log(error)
        }
    }

    const handleProceed = async () => {

        try {
            const res = await dispatch(getLanguageData(selectedLang));

            if (res.status) {
                dispatch(setSelectedLanguage(selectedLangData))
                navigation.navigate('Login');
            }

        } catch (error) {
            console.log(error)
        }
    };

    const handlePress = (item) => {
        setSelectedLang(item.id)
        setSelectedLangData(item)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Language</Text>
            <Text style={styles.subtitle}>Choose your preferred language for a personalized experience.</Text>

            <FlatList
                data={language}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <CustomRadioButton
                        selected={selectedLang === item.id}
                        label={item.name}
                        subLabel={item.language}
                        onPress={() => handlePress(item)}
                    />
                )}
            />

            <CustomButton
                title="Proceed"
                onPress={handleProceed}
                style={styles.button}
            />
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
