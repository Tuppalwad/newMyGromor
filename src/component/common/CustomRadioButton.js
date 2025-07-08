// src/components/CustomRadioButton.js

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import colors from '../../utils/theam';

const CustomRadioButton = ({ selected, onPress, label, subLabel }) => {
    return (
        <TouchableOpacity style={styles.box} onPress={onPress}>
            <View style={styles.row}>
                <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
                    {selected && <View style={styles.radioInner} />}
                </View>
                <View>
                    <Text style={[styles.label, selected && styles.labelSelected]}>{subLabel}</Text>
                    <Text style={styles.subLabel}>{label}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CustomRadioButton;

const styles = StyleSheet.create({
    box: {
        flex: 1,
        padding: 12,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: colors.primary,
        margin: 6,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 40,
        marginLeft: 10,
    },
    radioOuter: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioOuterSelected: {
        borderColor: colors.primary,
    },
    radioInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primary,
    },
    label: {
        // fontWeight: 'bold',
        lineHeight: 10,
        color: '#333',
        fontSize: 18
    },
    labelSelected: {
        color: colors.textPrimary,
        fontWeight: 'bold',

    },
    subLabel: {
        // lineHeight: 10,
        fontSize: 16,
        color: '#666',
    },
});
