import React from 'react';
import { View, TextInput, StyleSheet, Image, Text } from 'react-native';
import searchIcon from '../../assets/images/splash/search.png'; // adjust the path if needed

const SearchBar = ({ placeholder = 'Search for Seeds', onChangeText }) => {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder=""
                style={styles.input}
                onChangeText={onChangeText}
            >
                <Text style={styles.placeholderText}>Search for <Text style={styles.boldText}>Seeds</Text></Text>
            </TextInput>
            <Image source={searchIcon} style={styles.icon} />
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 0,
        paddingHorizontal: 10,
        paddingVertical: 12

    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#333',
        paddingHorizontal: 16,
        paddingVertical: 5
    },
    placeholderText: {
        fontSize: 14,
        color: '#999',
    },
    boldText: {
        fontWeight: '600',
        color: '#333',
    },
    icon: {
        width: 16,
        height: 16,
        marginRight: 10,
        tintColor: 'green',
    },
});
