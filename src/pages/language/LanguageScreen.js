// src/pages/LanguageScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CustomButton from '../../component/common/CustomButton';
import CustomRadioButton from '../../component/common/CustomRadioButton';
import { languages } from '../../utils/data';
import colors from '../../utils/theam';

const LanguageScreen = ({ navigation }) => {
    const [selectedLang, setSelectedLang] = useState('en');

    const handleProceed = () => {
        // Save language & navigate
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Language</Text>
            <Text style={styles.subtitle}>Choose your preferred language for a personalized experience.</Text>

            <FlatList
                data={languages}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <CustomRadioButton
                        selected={selectedLang === item.id}
                        label={item.label}
                        subLabel={item.native}
                        onPress={() => setSelectedLang(item.id)}
                    />
                )}
            />

            <CustomButton
                title="Proceed →"
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
